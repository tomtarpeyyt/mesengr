import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const getOrCreate = mutation({
    args: { otherUserId: v.id("users") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called currentUser without authenticated user");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        const chat = await ctx.db
            .query("chats")
            .filter((q) =>
                q.or(
                    q.and(
                        q.eq(q.field("participantOneId"), user._id),
                        q.eq(q.field("participantTwoId"), args.otherUserId)
                    ),
                    q.and(
                        q.eq(q.field("participantOneId"), args.otherUserId),
                        q.eq(q.field("participantTwoId"), user._id)
                    )
                )
            )
            .unique();

        if (chat) {
            return chat._id;
        }


        const chatId = await ctx.db.insert("chats", {
            participantOneId: user._id,
            participantTwoId: args.otherUserId,
        });
        return chatId;
    }
});


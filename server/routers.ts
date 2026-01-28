import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createSeminarRegistration } from "./db";
import { sendAdminNotification, sendApplicantConfirmation } from "./sendgrid";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  seminar: router({
    register: publicProcedure
      .input(
        z.object({
          companyName: z.string().min(1, "会社名を入力してください"),
          name: z.string().min(1, "氏名を入力してください"),
          position: z.string().min(1, "役職を入力してください"),
          email: z.string().email("有効なメールアドレスを入力してください"),
          phone: z.string().min(10, "有効な電話番号を入力してください"),
          challenge: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // データベースに保存
        await createSeminarRegistration({
          companyName: input.companyName,
          name: input.name,
          position: input.position,
          email: input.email,
          phone: input.phone,
          challenge: input.challenge || null,
        });

        // 管理者への通知メール送信
        await sendAdminNotification({
          companyName: input.companyName,
          name: input.name,
          position: input.position,
          email: input.email,
          phone: input.phone,
          challenge: input.challenge,
          createdAt: new Date(),
        });

        // 申込者への自動返信メール送信
        await sendApplicantConfirmation({
          companyName: input.companyName,
          name: input.name,
          position: input.position,
          email: input.email,
        });

        return {
          success: true,
          message: "申込が完了しました。確認メールをお送りしました。",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;

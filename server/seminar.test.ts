import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// モック関数
vi.mock("./db", () => ({
  createSeminarRegistration: vi.fn().mockResolvedValue({ insertId: 1 }),
  getDb: vi.fn().mockResolvedValue({}),
}));

vi.mock("./sendgrid", () => ({
  sendAdminNotification: vi.fn().mockResolvedValue(true),
  sendApplicantConfirmation: vi.fn().mockResolvedValue(true),
}));

function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("seminar.register", () => {
  it("正常な申込データで登録が成功する", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.seminar.register({
      companyName: "テスト不動産株式会社",
      name: "山田太郎",
      position: "営業部長",
      email: "test@example.com",
      phone: "090-1234-5678",
      challenge: "物件調査に時間がかかる",
    });

    expect(result).toEqual({
      success: true,
      message: "申込が完了しました。確認メールをお送りしました。",
    });
  });

  it("必須項目が欠けている場合はエラーになる", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.seminar.register({
        companyName: "",
        name: "山田太郎",
        position: "営業部長",
        email: "test@example.com",
        phone: "090-1234-5678",
      })
    ).rejects.toThrow();
  });

  it("無効なメールアドレスの場合はエラーになる", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.seminar.register({
        companyName: "テスト不動産株式会社",
        name: "山田太郎",
        position: "営業部長",
        email: "invalid-email",
        phone: "090-1234-5678",
      })
    ).rejects.toThrow();
  });

  it("課題フィールドは任意である", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.seminar.register({
      companyName: "テスト不動産株式会社",
      name: "山田太郎",
      position: "営業部長",
      email: "test@example.com",
      phone: "090-1234-5678",
    });

    expect(result.success).toBe(true);
  });
});

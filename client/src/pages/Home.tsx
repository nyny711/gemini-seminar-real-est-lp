import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trpc } from "@/lib/trpc";
import { Building2, Calendar, Clock, FileText, Search, TrendingUp, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    position: "",
    email: "",
    phone: "",
    challenge: "",
  });

  const registerMutation = trpc.seminar.register.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({
        companyName: "",
        name: "",
        position: "",
        email: "",
        phone: "",
        challenge: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "申込に失敗しました。もう一度お試しください。");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDEwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="container relative mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-block rounded-md border border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-400">
              anyenv株式会社主催ウェビナー
            </div>
            <h2 className="mb-3 text-xl md:text-2xl font-medium text-cyan-400">
              不動産DXウェビナー 営業改革シリーズ
            </h2>
            <div className="mb-6 inline-block rounded-md bg-blue-600 px-4 py-1 text-sm font-bold">
              参加無料
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              不動産営業を
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AIで変革する
              </span>
            </h1>
            <p className="mb-8 text-lg md:text-xl text-slate-300">
              物件調査・見積作成・契約書作成などの業務をAIで自動化し、
              <br />
              営業マンを「本来の仕事」に集中させる具体的メソッドを解説！
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-8 py-6 h-auto rounded-md"
              onClick={() => {
                document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              今すぐ申し込む（無料） →
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-8 h-12 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* セミナー概要カード */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">セミナー概要</h2>
        <Card className="max-w-5xl mx-auto overflow-hidden border-2 border-cyan-500">
          <div className="grid md:grid-cols-[300px,1fr]">
            {/* 左側：バナー画像 */}
            <div className="bg-white flex items-center justify-center">
              <img 
                src="/seminar-banner.png" 
                alt="不動産DXウェビナー 営業改革シリーズ VOL.1" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* 右側：セミナー情報 */}
            <div>
              <CardContent className="p-6 pt-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span className="font-semibold">2026年2月17日（火）</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span className="font-semibold">14:00～15:00</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">煩雑な業務をAIで自動化し、顧客に向き合う時間を増やす方法</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">物件調査・見積作成・契約書作成などの業務をAIで自動化</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">営業マンを「本来の仕事」に集中させる具体的メソッドを解説</p>
                    </div>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-md border border-cyan-200">
                    <p className="text-sm text-gray-700">
                      <strong>開催形式:</strong> オンライン（Google Meet）
                      <br />
                      <strong>途中参加・途中退出:</strong> OK
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </section>

      {/* 課題セクション */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              こんなお悩みありませんか？
            </h2>
            <p className="text-center text-gray-600 mb-12">
              その課題、Geminiで解決できます。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                    <Clock className="w-6 h-6 text-cyan-600" />
                  </div>
                  <CardTitle className="text-xl">物件調査に時間がかかる</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    周辺環境、交通アクセス、市場価格…調査項目が多すぎて、1物件あたり数時間かかってしまう
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">見積作成が属人化</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    賃料計算、収支シミュレーション、利回り計算…ベテランに頼らないと正確な見積が作れない
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">物件情報の検索が大変</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    膨大な物件データベースから条件に合う物件を探すのに時間がかかり、商談機会を逃してしまう
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">商談準備に追われる</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    提案資料、契約書ドラフト、重要事項説明書…書類作成に追われて顧客対応の時間が取れない
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12">
              <div className="inline-block bg-slate-900 text-white px-6 py-3 rounded-lg">
                その課題、<span className="text-cyan-400 font-bold">Gemini</span>で解決できます。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 学べることセクション */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              本セミナーで学べること
            </h2>
            <p className="text-center text-gray-600 mb-12">
              不動産営業の現場で実際に使える、4つの実践スキルを習得できます。
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white border-2 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">物件調査の自動化</CardTitle>
                  <CardDescription>周辺環境や市場価格を瞬時に調査</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    物件仕様書、過去の提案資料、技術マニュアルなど、社内に散在する情報を一元管理し、必要な情報を瞬時に引き出す方法を学びます。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">見積・収支計算の効率化</CardTitle>
                  <CardDescription>賃料計算や収支シミュレーションを短時間で作成</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    顧客ごとにカスタマイズされた提案書を自動生成し、営業担当者は戦略的な提案に集中できます。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">営業日報の効率化</CardTitle>
                  <CardDescription>音声入力で日報を5分で完了</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    商談内容を音声で記録し、AIが自動で整形・要約。日報作成時間を大幅に削減します。
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">顧客対応の質向上</CardTitle>
                  <CardDescription>非コア業務を削減し、顧客との時間を最大化</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    AIが非コア業務を代行することで、営業担当者は顧客との関係構築や戦略的な提案活動に時間を使えるようになります。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              よくある質問
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-2 border-yellow-400">
                <AccordionTrigger className="text-left hover:no-underline font-semibold">
                  AIの知識がなくても参加できますか？
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  はい、問題ありません。このセミナーは初心者の方でも理解できるよう、基礎から丁寧に解説します。実際の操作画面を見ながら学べるので、AIに触れたことがない方でも安心してご参加いただけます。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-2 border-yellow-400">
                <AccordionTrigger className="text-left hover:no-underline font-semibold">
                  途中参加・途中退出は可能ですか？
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  はい、可能です。ご都合に合わせて自由に参加・退出いただけます。ただし、セミナーの録画配信は行っておりませんので、できる限り最初からご参加いただくことをおすすめします。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-2 border-yellow-400">
                <AccordionTrigger className="text-left hover:no-underline font-semibold">
                  資料は配布されますか？
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  はい、セミナー終了後に参加者の皆様に資料をメールでお送りします。また、実践で使えるプロンプト集もご提供いたしますので、すぐに業務に活かしていただけます。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-2 border-yellow-400">
                <AccordionTrigger className="text-left hover:no-underline font-semibold">
                  複数名での参加は可能ですか？
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  はい、可能です。チームでの参加も大歓迎です。複数名でご参加いただく場合は、お手数ですが各自で申込フォームからご登録をお願いいたします。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border-2 border-yellow-400">
                <AccordionTrigger className="text-left hover:no-underline font-semibold">
                  録画視聴は可能ですか？
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  申し訳ございませんが、セミナーの録画配信は行っておりません。リアルタイムでのご参加をお願いいたします。ただし、途中参加・途中退出は自由ですので、ご都合に合わせてご参加ください。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* なぜ無料で実施するのか */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              なぜ"無料"で実施するのか
            </h2>
            <div className="bg-slate-50 p-8 md:p-12 rounded-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                私たちは、AIを活用することで業務改善が実際に進むということを、
                <br />
                まずは体感していただきたいと考えています。
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                単なる知識提供ではなく、
                <br />
                「自社の業務にどう活かせるのか」「どこが効率化できそうか」を
                <br />
                具体的にイメージしていただくことが目的です。
              </p>
              <p className="text-xl font-bold text-cyan-600">
                まずは60分、"成果につながるAI活用"を体験してください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 参加概要 */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">参加概要</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>対象</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 不動産営業担当者</li>
                    <li>• 営業企画・管理職の方</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>日時・所要時間</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 2026年2月3日（月）</li>
                    <li>• 14:00～15:00</li>
                    <li>• 約60分</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>開催形式</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• オンライン（Google Meet）</li>
                    <li>• ※全国どこからでも参加可能</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>参加費</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-cyan-600">無料</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 申込フォーム */}
      <section id="registration-form" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              参加申し込み
            </h2>

            <Card className="shadow-xl border-2">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="companyName">
                      会社名 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="〇〇不動産株式会社"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="name">
                      名前 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="山田太郎"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="position">
                      役職 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="position"
                      placeholder="営業部長"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      メールアドレス <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      電話番号 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="090-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="challenge">課題に感じていること</Label>
                    <Textarea
                      id="challenge"
                      placeholder="例：物件調査に時間がかかる、見積作成が属人化している..."
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg py-6 h-auto"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "送信中..." : "無料で参加登録する"}
                  </Button>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>※ 研修に関して、事前にご連絡させていただく場合がございます。</p>
                    <p>※ 同業他社様のご参加はお断りする場合がございます。</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-bold">anyenv株式会社</h3>
            <p className="text-slate-400">代表取締役：四宮 浩二</p>
            <p className="text-slate-400">
              〒150-0043 東京都渋谷区道玄坂2-25-12 道玄坂通5F
            </p>
            <p className="text-slate-400">
              お問い合わせ：
              <a href="mailto:info@anyenv-inc.com" className="text-cyan-400 hover:underline">
                info@anyenv-inc.com
              </a>
            </p>
            <div className="pt-4 border-t border-slate-700">
              <a href="#" className="text-slate-400 hover:text-cyan-400 text-sm">
                プライバシーポリシー
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, BarChart3, Search, FileText, MessageSquare, BrainCircuit, Users, Clock, Target, Building2, TrendingUp, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// セミナー情報の定義
const seminar = {
  id: "vol1",
  title: "「商談時間」を最大化する",
  subtitle: "～非コア業務をAIで自動化し、顧客に向き合う～",
  date: "2026年2月3日(火)",
  time: "14:00～15:00",
  image: "/seminar-vol1.png",
  description: "物件調査・見積作成・契約書作成...その事務作業、AIなら一瞬です。不動産営業を「本来の仕事」に集中させる具体的メソッドを解説！"
};

export default function Home() {

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    position: "",
    email: "",
    phone: "",
    challenge: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRegistration = trpc.seminar.submitRegistration.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.company.trim()) errors.company = "会社名は必須です";
    if (!formData.name.trim()) errors.name = "名前は必須です";
    if (!formData.position.trim()) errors.position = "役職は必須です";
    if (!formData.email.trim()) errors.email = "メールアドレスは必須です";
    if (!formData.email.includes("@")) errors.email = "有効なメールアドレスを入力してください";
    if (!formData.phone.trim()) errors.phone = "電話番号は必須です";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const result = await submitRegistration.mutateAsync({
        company: formData.company,
        name: formData.name,
        position: formData.position,
        email: formData.email,
        phone: formData.phone,
        challenge: formData.challenge,
      });

      if (result.success) {
        toast.success("申し込みが完了しました。確認メールをご確認ください。");
        setFormData({
          company: "",
          name: "",
          position: "",
          email: "",
          phone: "",
          challenge: "",
        });
      } else {
        toast.error("申し込み処理中にエラーが発生しました。もう一度お試しください。");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("申し込み処理中にエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Real Estate Office" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30" />
          
          {/* Animated Tech Lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-cyan-500/50" />
            <div className="absolute top-3/4 left-0 w-full h-[1px] bg-cyan-500/50" />
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-cyan-500/50" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-cyan-500/50" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-sm border-cyan-500 text-cyan-400 bg-cyan-500/10">
              anyenv株式会社主催ウェビナー
            </Badge>
            
            <div className="mb-8">
              <p className="text-cyan-400 text-lg mb-2">不動産DXウェビナー 営業改革シリーズ</p>
              <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 text-base">
                参加無料
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              不動産営業を<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AIで変革する
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              物件調査・見積作成・契約書作成などの非コア業務をAIで自動化し、<br />
              営業マンを「本来の仕事」に集中させる具体的メソッドを解説！
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                今すぐ申し込む（無料）
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-500 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-cyan-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Seminar Details Section */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">セミナー概要</h2>
            <div className="w-20 h-1 bg-cyan-600 mx-auto mt-6" />
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-cyan-500 shadow-xl overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img 
                  src={seminar.image} 
                  alt={seminar.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{seminar.title}</h3>
                <p className="text-lg text-cyan-600 mb-4">{seminar.subtitle}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="h-5 w-5 text-cyan-600" />
                    <span className="font-semibold">{seminar.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Target className="h-5 w-5 text-cyan-600" />
                    <span className="font-semibold">{seminar.time}</span>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">{seminar.description}</p>
                <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                  <p className="text-sm text-slate-700">
                    <strong className="text-cyan-700">開催形式:</strong> オンライン（Google Meet）<br />
                    <strong className="text-cyan-700">途中参加・途中退出:</strong> OK
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">こんなお悩みありませんか？</h2>
            <div className="w-20 h-1 bg-cyan-600 mx-auto mt-6" />
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
          >
            {[
              { icon: FileText, title: "物件調査に時間がかかる", desc: "周辺環境調査や市場価格のリサーチに数時間かかっている" },
              { icon: FileSpreadsheet, title: "見積作成が属人化", desc: "賃料計算や収支シミュレーションの作成方法が担当者によってバラバラ" },
              { icon: Search, title: "物件情報の検索が大変", desc: "過去の取引事例や類似物件を探すのに時間がかかる" },
              { icon: MessageSquare, title: "商談準備に追われる", desc: "提案資料作成に時間を取られ、顧客対応の時間が不足" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-cyan-500 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-cyan-100 text-cyan-600">
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <p className="text-xl text-slate-700 font-semibold mb-4">
              これらの課題、<span className="text-cyan-600">Geminiで解決できます</span>
            </p>
            <p className="text-slate-600 max-w-2xl mx-auto">
              不動産営業における非コア業務をAIで効率化し、<br />
              本来の営業活動に集中できる環境を実現します。
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">このセミナーで学べること</h2>
            <div className="w-20 h-1 bg-cyan-600 mx-auto mt-6" />
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Building2,
                title: "物件調査の自動化",
                items: [
                  "周辺環境・競合物件の自動調査",
                  "市場価格データの即時分析",
                  "エリア特性レポートの自動生成",
                  "投資価値の定量評価"
                ]
              },
              {
                icon: FileSpreadsheet,
                title: "見積・収支計算の効率化",
                items: [
                  "賃料・管理費の自動計算",
                  "収支シミュレーションの即時作成",
                  "投資回収期間の自動算出",
                  "リスク分析レポートの生成"
                ]
              },
              {
                icon: MessageSquare,
                title: "商談資料の自動作成",
                items: [
                  "顧客ニーズに合わせた提案書作成",
                  "契約書ドラフトの自動生成",
                  "物件比較表の即時作成",
                  "プレゼン資料の自動構成"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl border-2 border-slate-200 hover:border-cyan-500 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white mb-6 mx-auto">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">{item.title}</h3>
                <ul className="space-y-3">
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{subItem}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Real Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">実際の活用事例</h2>
            <div className="w-20 h-1 bg-cyan-600 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "物件調査時間を90%削減",
                company: "A社（商業不動産仲介）",
                before: "周辺環境調査・競合分析に半日かかっていた",
                after: "Geminiで10分で完了。調査精度も向上",
                icon: TrendingUp
              },
              {
                title: "見積作成を5分で完了",
                company: "B社（不動産投資コンサル）",
                before: "収支シミュレーション作成に2時間",
                after: "条件入力だけで自動生成。顧客満足度も向上",
                icon: BarChart3
              },
              {
                title: "提案資料作成を自動化",
                company: "C社（オフィス仲介）",
                before: "顧客向け提案書作成に3時間",
                after: "物件情報から自動生成。商談準備時間が1/10に",
                icon: FileText
              },
              {
                title: "契約書作成を効率化",
                company: "D社（不動産管理）",
                before: "契約書ドラフト作成に1時間以上",
                after: "テンプレートから自動生成。法務チェックも効率化",
                icon: CheckCircle2
              }
            ].map((item, index) => (
              <Card key={index} className="border-2 border-slate-200 hover:border-cyan-500 transition-colors shadow-sm hover:shadow-md">
                <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                  <CardTitle className="flex items-center gap-3 text-slate-900">
                    <item.icon className="h-6 w-6 text-cyan-600" />
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-2">{item.company}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-red-600 mb-1">導入前</p>
                      <p className="text-sm text-slate-700">{item.before}</p>
                    </div>
                    <div className="h-[1px] bg-slate-200" />
                    <div>
                      <p className="text-xs font-semibold text-cyan-600 mb-1">導入後</p>
                      <p className="text-sm text-slate-700 font-semibold">{item.after}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">よくある質問</h2>
            <div className="w-20 h-1 bg-cyan-600 mx-auto mt-6" />
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white border-2 border-slate-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-cyan-600">
                  Q. AIを使ったことがなくても参加できますか？
                </AccordionTrigger>
                <AccordionContent className="text-slate-700">
                  はい、問題ありません。このセミナーは、AIを初めて使う方でも理解できるよう、基礎から丁寧に解説します。実際の不動産業務での活用事例を中心に、具体的な使い方をご紹介します。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white border-2 border-slate-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-cyan-600">
                  Q. Geminiは有料ですか？
                </AccordionTrigger>
                <AccordionContent className="text-slate-700">
                  Geminiには無料プランと有料プラン（Gemini Advanced）があります。セミナーでは、無料プランでもできる活用方法と、有料プランでさらに効率化できる方法の両方をご紹介します。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white border-2 border-slate-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-cyan-600">
                  Q. 不動産業界以外でも参加できますか？
                </AccordionTrigger>
                <AccordionContent className="text-slate-700">
                  このセミナーは不動産業界に特化した内容となっております。他業界の方でも参加は可能ですが、事例や活用方法は不動産営業を前提としたものになります。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white border-2 border-slate-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-cyan-600">
                  Q. セミナー後のサポートはありますか？
                </AccordionTrigger>
                <AccordionContent className="text-slate-700">
                  セミナー参加者には、質問用のメールアドレスをご案内します。また、ご希望の企業様には、個別コンサルティングのご案内も可能です。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white border-2 border-slate-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-cyan-600">
                  Q. 録画視聴は可能ですか？
                </AccordionTrigger>
                <AccordionContent className="text-slate-700">
                  申し訳ございませんが、録画配信は予定しておりません。当日リアルタイムでのご参加をお願いいたします。ただし、途中参加・途中退出は自由です。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Why Free Section */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">なぜ無料なのか？</h2>
              <div className="w-20 h-1 bg-cyan-600 mx-auto mt-6" />
            </div>

            <div className="text-left space-y-6 text-slate-700 leading-relaxed text-lg">
              <p>
                私たちは、AIを活用することで業務改善が実際に進むということを、<br />
                まずは体感していただきたいと考えています。
              </p>
              <p>
                単なる知識提供ではなく、<br />
                「自社の業務にどう活かせるのか」「どこが効率化できそうか」を<br />
                具体的にイメージしていただくことが目的です。
              </p>
              <p className="font-semibold text-cyan-700">
                まずは60分、"成果につながるAI活用"を体験してください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">参加概要</h2>
            <div className="w-20 h-1 bg-cyan-600 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-slate-200 shadow-sm">
              <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <Users className="h-6 w-6 text-cyan-600" />
                  対象
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>不動産営業担当者</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>不動産営業企画・管理職の方</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>不動産仲介・管理会社の経営者</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 shadow-sm">
              <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <Clock className="h-6 w-6 text-blue-600" />
                  日時・所要時間
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{seminar.date}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{seminar.time}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>約60分</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 shadow-sm">
              <CardHeader className="bg-gradient-to-br from-indigo-50 to-purple-50">
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <Target className="h-6 w-6 text-indigo-600" />
                  開催形式
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>オンライン（Google Meet）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>※全国どこからでも参加可能</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-500 shadow-lg bg-gradient-to-br from-cyan-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <CheckCircle2 className="h-6 w-6 text-cyan-600" />
                  参加費
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-cyan-600">無料</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section Before Form */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-500" />
        </div>
        
        <div className="container px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              営業のやり方、<br />
              そろそろアップデートしませんか？
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Geminiで変わる"次世代の不動産営業"を体験してください。
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              今すぐ申し込む（無料）
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="registration-form" className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">参加申し込み</h2>
              <div className="w-20 h-1 bg-cyan-600 mx-auto mt-6" />
            </div>

            <Card className="border-2 border-slate-200 shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
                      会社名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="〇〇不動産株式会社"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                    {formErrors.company && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.company}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                      名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="山田太郎"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-semibold text-slate-900 mb-2">
                      役職 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="営業部長"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                    {formErrors.position && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.position}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                      電話番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="090-1234-5678"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="challenge" className="block text-sm font-semibold text-slate-900 mb-2">
                      課題に感じていること
                    </label>
                    <textarea
                      id="challenge"
                      value={formData.challenge}
                      onChange={handleInputChange}
                      placeholder="例：物件調査に時間がかかる、見積作成が属人化している..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "送信中..." : "無料で参加登録する"}
                  </Button>

                  <div className="text-center text-sm text-slate-600 space-y-1">
                    <p>※ 研修に関して、事前にご連絡させていただく場合がございます。</p>
                    <p>※ 同業他社様のご参加はお断りする場合がございます。</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">会社概要</h3>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>会社名：anyenv株式会社</p>
                <p>代表取締役：四宮 浩二</p>
                <p>住所：東京都渋谷区道玄坂2-25-12<br />道玄坂通5F</p>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                anyenv株式会社は、エージェントグループ（証券コード：7098）の<br />
                DX・AI専門関連会社です
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">お問い合わせ</h3>
              <a href="mailto:info@anyenv-inc.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                info@anyenv-inc.com
              </a>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">その他</h3>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                プライバシーポリシー
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

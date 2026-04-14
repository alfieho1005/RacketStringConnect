import Link from "next/link";

export default function TennisStringTypesExplained() {
  return (
    <>
      <p>
        如果你係穿線師，面對客人第一句通常會問：「你用咩線？想要力量、控制，定係舒適？」要答得好，就一定要真正明白而家市面上幾種主流線材係乜嘢材料、點樣製造，同埋佢哋本質上嘅差異。
      </p>

      <h2>常見網球拍線材種類</h2>
      <p>而家主流網球線材大約可以分為以下幾大類：</p>
      <ul>
        <li>天然腸線（Natural Gut）</li>
        <li>尼龍線 / 仿腸線（Nylon / Synthetic Gut）</li>
        <li>聚酯線（Polyester / Co-Polyester）</li>
        <li>克維拉（Kevlar / Aramid）</li>
        <li>混合穿法（Hybrid：例如 Gut + Poly、Synthetic + Poly）</li>
      </ul>
      <p>
        下面會由一個專業穿線師嘅角度，逐樣講解呢啲材料點樣製造，同埋佢哋本質上嘅物理特性。
      </p>

      {/* ── Natural Gut ── */}
      <h2>天然腸線（Natural Gut）：最「有感」但最貴</h2>

      <h3>製作過程</h3>
      <p>
        天然腸線原料係牛腸，經過化學浸泡、清洗、漂白，再拉成纖維，慢慢乾燥，之後打磨拋光，直至達到指定直徑，最後再塗上一層保護塗層（例如聚氨酯）。整個過程相對複雜，所以成本高。
      </p>

      <h3>本質特性（穿線師角度）</h3>
      <ul>
        <li>
          <strong>彈性高、手感最柔和：</strong>
          喺球拍面上有明顯「一口氣」嘅感覺，擊球時吸震同反彈都好自然，適合重視手感、控制同舒適度嘅球員。
        </li>
        <li>
          <strong>怕潮濕：</strong>
          一焗到濕度高，腸線會變鬆，磅數容易衰減，所以喺潮濕地區要特別留意。
        </li>
        <li>
          <strong>較貴同耐久性一般：</strong>
          如果唔係職業級，其實唔建議長期用「全 Gut」，多數會同 Poly 做 hybrid 搭配。
        </li>
      </ul>

      {/* ── Nylon / Synthetic Gut ── */}
      <h2>尼龍線 / 仿腸線（Nylon / Synthetic Gut）</h2>

      <h3>製作過程</h3>
      <p>
        尼龍線係以合成纖維（尼龍或聚酯類）經過「熔融紡絲」，由噴絲頭噴出細絲，再拉伸、定型，有時會再加多芯結構或包芯來調整手感。結構上可以係
        single-core、多芯（multi-core）或者不同複合結構。
      </p>

      <h3>本質特性</h3>
      <ul>
        <li>
          <strong>性價比高：</strong>
          耐用度比天然腸線好，成本低，手感亦算柔軟，適合大多數初中級球員。
        </li>
        <li>
          <strong>偏中庸：</strong>
          冇 Poly 嘅極致控制，亦冇 Gut 嘅極致手感，但勝在穩定、易用。
        </li>
        <li>
          <strong>磅數會慢慢鬆：</strong>
          相對 Poly 會有較明顯嘅磅數衰減，所以如果打唔密，要留意手感會一點點變「軟」。
        </li>
      </ul>

      {/* ── Polyester ── */}
      <h2>聚酯線（Polyester / Co-Polyester）</h2>

      <h3>製作過程</h3>
      <p>
        Polyester 線通常係以單芯（monofilament）或共聚酯（co-poly）結構，用聚合物熔融紡絲，再拉伸，令分子排列更緊，增加硬度同耐用度。有時會再加多角表面（rough、square、hexagonal）嚟加強咬球。
      </p>

      <h3>本質特性</h3>
      <ul>
        <li>
          <strong>非常耐用：</strong>
          極難斷，適合力量大、打波密、或者經常斷線嘅球員。
        </li>
        <li>
          <strong>偏硬、偏控制：</strong>
          對手肘、手腕有較大衝擊，所以要控制磅數，唔好越打越高磅，否則手容易出事。
        </li>
        <li>
          <strong>愈細嘅線愈多旋轉：</strong>
          細線（約 1.20–1.25 mm）會有更多旋轉同手感，但相對會少啲耐久度。
        </li>
      </ul>
      <p>
        喺專業穿線師眼中，poly 咁硬，其實係「犧牲舒適換來控制同耐用」，所以一定要配合適合磅數同打法，或者用
        hybrid 做平衡。
      </p>

      {/* ── Kevlar ── */}
      <h2>克維拉（Kevlar / Aramid）：最硬最耐用</h2>

      <h3>製作過程</h3>
      <p>
        Kevlar 屬於高強度 aramid 纖維，用高溫紡絲、拉伸，製造出極硬、極耐磨嘅單絲線。佢嘅結構非常穩定，抗拉力同耐磨度都係頂級。
      </p>

      <h3>本質特性</h3>
      <ul>
        <li>
          <strong>最硬、最耐用：</strong>
          拉力衰減極慢，幾乎唔怕磨，所以有啲人用「子母線」（Kevlar + Nylon/Poly），讓硬線長久保持結構，軟線負責手感。
        </li>
        <li>
          <strong>對手臂震動最強：</strong>
          因為超硬，所以唔建議用「全 Kevlar」，尤其係仲揀高磅數，極易造成手肘、手腕不適。
        </li>
        <li>
          <strong>多用於混合穿法：</strong>
          一般只做主線，用 Nylon 或 multifilament 做橫線，平衡手感同耐用。
        </li>
      </ul>

      {/* ── Hybrid ── */}
      <h2>混合穿法（Hybrid）：最佳實戰平衡</h2>
      <p>
        由專業穿線師角度，hybrid 係最常見嘅解決方案，將「硬線」同「軟線」混合使用，例如：
      </p>
      <ul>
        <li>
          <strong>主線用 Poly 或 Kevlar</strong>（控制、耐用）
        </li>
        <li>
          <strong>橫線用 Natural Gut 或 Nylon</strong>（舒適、手感）
        </li>
      </ul>
      <p>
        呢種做法可以同時保留 poly/kevlar 嘅控制同耐用，又避免整把拍都硬到底，對一般球員係最合理嘅選擇。
      </p>

      {/* ── Summary table ── */}
      <h2>總結：由製作看透每種線嘅本質</h2>
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 text-left">
              <th className="py-2 pr-4 font-semibold text-slate-900">
                線材類型
              </th>
              <th className="py-2 pr-4 font-semibold text-slate-900">
                本質特點
              </th>
              <th className="py-2 font-semibold text-slate-900">適合球員</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4 font-medium text-slate-800">
                天然腸線
              </td>
              <td className="py-2 pr-4">
                彈性高、手感最柔和，怕潮，貴
              </td>
              <td className="py-2">重視手感、舒適度嘅中高階球員</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4 font-medium text-slate-800">尼龍線</td>
              <td className="py-2 pr-4">
                性價比高、手感中等，耐久一般
              </td>
              <td className="py-2">初學者、中級球員</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4 font-medium text-slate-800">聚酯線</td>
              <td className="py-2 pr-4">
                極硬、耐久高、控制強，手肘易累
              </td>
              <td className="py-2">力量大、打波密、常斷線</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4 font-medium text-slate-800">
                克維拉線
              </td>
              <td className="py-2 pr-4">
                最硬最耐用，震動大，不宜全用
              </td>
              <td className="py-2">用 hybrid 子母線增加耐用</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-slate-800">
                混合穿法
              </td>
              <td className="py-2 pr-4">平衡控制、耐用、手感</td>
              <td className="py-2">大多數進階球員</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        了解每種線材嘅製作原理同物理本質，先至可以真正幫客人揀到最適合嘅穿線方案。如果你唔肯定自己適合咩線材，最好搵有經驗嘅穿線師幫你分析打法同需求。
      </p>

      {/* Internal link */}
      <p>
        想搵專業穿線師幫你分析同穿線？即刻瀏覽我哋嘅{" "}
        <Link
          href="/"
          className="font-semibold text-yellow-600 underline underline-offset-4 hover:text-yellow-700"
        >
          香港穿線師目錄
        </Link>
        ，WhatsApp 直接聯絡，毋需中間人。
      </p>
    </>
  );
}

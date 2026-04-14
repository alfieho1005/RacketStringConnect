import Link from "next/link";

export default function AlcarazVsSinnerPolyComparison() {
  return (
    <>
      <p>
        Alcaraz 同 Sinner 嘅對比，可以睇成<strong>「極致攻擊創意人」對「精準壓迫機器」</strong>。喺打法同裝備上，兩個都用「全
        poly」，但係原因同風格其實好唔同。
      </p>

      {/* ── Basic setup comparison ── */}
      <h2>基本設定對比</h2>
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 text-left">
              <th className="py-2 pr-4 font-semibold text-slate-900">項目</th>
              <th className="py-2 pr-4 font-semibold text-slate-900">Carlos Alcaraz</th>
              <th className="py-2 font-semibold text-slate-900">Jannik Sinner</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4 font-medium text-slate-800">球拍</td>
              <td className="py-2 pr-4">Babolat Pure Aero 系列（偏輕，大力型）</td>
              <td className="py-2">HEAD TGT 301.4（Pro stock，速度控制框架）</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4 font-medium text-slate-800">線材</td>
              <td className="py-2 pr-4">全 Babolat RPM Blast / RPM Team（1.30 Poly）</td>
              <td className="py-2">全 HEAD Hawk Touch（1.30 co-poly）</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-slate-800">磅數</td>
              <td className="py-2 pr-4">約 55 / 53 lb（約 24–25 kg）</td>
              <td className="py-2">約 61 lb（約 28 kg）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        簡單講：兩人都用「poly 半粗線（1.30 mm）+ 全線 poly」，但 Sinner 磅更高、線更「死啲」；Alcaraz
        磅相對低啲，打法更「放大招」。
      </p>

      {/* ── Play style comparison ── */}
      <h2>打法風格對比</h2>

      <h3>Alcaraz：華麗 + 早擊 + 上網壓迫</h3>
      <p>
        Alcaraz 偏好喺球喺前半空中已迎面擊打，用極大 swing 送出重上旋、角度同殺傷力，睇落好似「狂風暴雨」咁，有好多
        unexpected shot（飛身截擊、短球、居中推進）。
      </p>
      <p>
        佢係用自己嘅 arm speed、步伐同 creativeness 去打破平衡，屬於<strong>「force-based aggressive」</strong>。
      </p>
      <p>
        <strong>弱點：</strong>控制波動較大。因為 swings 太大，timing
        一亂就會有較多 unforced error，尤其係正手返底線時會噴球，對手可以用快速度、角度去試佢嘅穩定度。
      </p>

      <h3>Sinner：精準 + 壓迫 + 底線穩定</h3>
      <p>
        Sinner 嘅打法係「所有基本面都打好 + 打得重 + 打得準」，地面拍擊落點深、角度正，用極少嘅動作出極大嘅球速，多位球評都話佢
        groundstrokes 可能係世界最頂尖。
      </p>
      <p>
        佢少用誇張嘅角度，多係用<strong>「穩定喺 deep zone 用強力壓迫」</strong>，令對手永遠喺防守位。
      </p>
      <p>
        <strong>弱點：</strong>打法較「乾淨」，少花式。相對 Alcaraz，Sinner
        少咗那些嘩眾取寵嘅 shot，但係佢喺「持續壓力、節奏、穩定度」方面更成熟，好似「冷靜機器」咁，用重球同深位磨到對手出錯。
      </p>

      {/* ── Why both full poly ── */}
      <h2>點解兩個都用「全 Poly」，而唔係 Hybrid？</h2>
      <p>
        兩個都用「poly + poly」，但係出發點同物理效果其實有差別。
      </p>

      <h3>Alcaraz：用 Poly 來「控制」自己嘅威力</h3>
      <ul>
        <li>
          個人揮速高、力量大，如果用太軟嘅線（例如 natural gut），會更容易打飛同控制唔到。
        </li>
        <li>
          用 Babolat RPM 這種偏硬、高旋 Poly，可以喺佢大力抽擊下提供更穩定嘅回應同控制，幫佢收住落點，減低失誤風險。
        </li>
        <li>
          磅數中等（24–25 kg），喺控制同力量之間找平衡，唔會太傷手。
        </li>
      </ul>
      <p>
        簡化講：Alcaraz 嘅全 Poly，係用來幫佢<strong>「控制自己嘅 craziness」</strong>，而唔係逼自己打得更軟。
      </p>

      <h3>Sinner：用 Poly 來「穩定 + 壓迫」</h3>
      <ul>
        <li>
          佢用 HEAD Hawk Touch 這種相對「死啲」但控制好嘅 co-poly，再配喺 61 lb（約 28 kg）呢個高磅數。
        </li>
        <li>
          佢本身 swing 係平而直，喺高磅 Poly 下，可以打出非常穩定、平直、穿透力強嘅 groundstrokes，幾乎係「用同一條線、同一種感覺」去打完整場。
        </li>
        <li>
          佢框架本身都係偏向控制（HEAD 系統），Poly 線幫佢減少彈跳過剩，令每一板都落點精準。
        </li>
      </ul>
      <p>
        簡化講：Sinner 嘅全 Poly，係用來<strong>「最大化控制 + 穩定壓迫」</strong>，而唔係提升手感多啲。
      </p>

      {/* ── Key differences table ── */}
      <h2>兩人線材設定嘅關鍵差異</h2>
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 text-left">
              <th className="py-2 pr-4 font-semibold text-slate-900">角度</th>
              <th className="py-2 pr-4 font-semibold text-slate-900">Alcaraz</th>
              <th className="py-2 font-semibold text-slate-900">Sinner</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4 font-medium text-slate-800">線材</td>
              <td className="py-2 pr-4">Babolat RPM Blast（偏高彈、高旋）</td>
              <td className="py-2">HEAD Hawk Touch（偏中硬、控制強、少彈）</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4 font-medium text-slate-800">磅數</td>
              <td className="py-2 pr-4">55/53 lb（24–25 kg）中高磅</td>
              <td className="py-2">61 lb（28 kg）超高磅，「死線」狀態</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 pr-4 font-medium text-slate-800">框感</td>
              <td className="py-2 pr-4">輕身、速度快，用 Poly 控制 swing 嘅狂野</td>
              <td className="py-2">稍重控制框，Poly 令每一板精準如一</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-slate-800">適合對象</td>
              <td className="py-2 pr-4">力量大、想喺「控制範圍內」放大招嘅球員</td>
              <td className="py-2">想打好穩定底線、「機械式精準」嘅球員</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Takeaway for amateur players ── */}
      <h2>對一般球員嘅啟示</h2>

      <h3>Alcaraz 型打法</h3>
      <p>
        若你速度高、揮拍快、想玩角度同 early striking，可以用「全 poly」但磅數唔好跟職業咁高，例如
        <strong> 20–23 kg</strong>，配合輕身拍，先會好啲兼唔會傷手。
      </p>

      <h3>Sinner 型打法</h3>
      <p>
        若你係想打好「穩定底線 + 壓迫」，可以用略高磅數嘅 poly（例如 <strong>22–24 kg</strong>），甚至考慮用
        co-poly 類似 Hawk Touch 這種偏控制嘅線，但千萬唔好用「全 poly + 28 kg」跟佢，九成九會傷手，除非你係職業級。
      </p>

      <p>
        最重要嘅啟示係：同樣係「全 Poly」，Alcaraz 同 Sinner
        嘅設定完全唔同，因為佢哋嘅打法、身體條件同目標都唔一樣。揀線唔係跟大隊，而係要配合自己嘅風格。
      </p>

      {/* Internal links */}
      <p>
        想了解更多 Alcaraz 嘅穿線分析？睇埋{" "}
        <Link
          href="/blog/carlos-alcaraz-why-full-poly"
          className="font-semibold text-yellow-600 underline underline-offset-4 hover:text-yellow-700"
        >
          Carlos Alcaraz 點解堅持用全聚酯線
        </Link>
        。或者瀏覽{" "}
        <Link
          href="/blog/what-strings-do-pro-tennis-players-use"
          className="font-semibold text-yellow-600 underline underline-offset-4 hover:text-yellow-700"
        >
          ATP 同 WTA 球星穿線大公開
        </Link>
        ，睇埋其他球星嘅 setup。
      </p>
      <p>
        想搵專業穿線師幫你配線？即刻瀏覽我哋嘅{" "}
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

# MinecraftProfile
研究室の自己紹介用に作ったマインクラフトのブロック装飾の埋め込みhtmlです。

![アニメーションの様子](/README_images/メイン.gif)

**デモページはこちらです。** -> https://atsumi-gakuto.github.io/MinecraftProfile/

## 使い方
[index.html](./index.html)内の13行目`<!-- ここにプロフィールを書く -->`に好きなものを書いて下さい。尚、背景のブロックは必要に応じて、透明度を上げて下さい。

## 設定項目
[FallingMinecraftBlocks.js](./FallingMinecraftBlocks.js)の始めにアニメーション設定用の変数があります（`/* 設定用変数エリア 開始 */`から`/* 設定用変数エリア 終了 */`までの間）。ここの変数を変更する事によってアニメーションの設定を変更できます。

| 項目 | 有効な型 | 説明 |
| - | - | - |
| `horizontalBlocks` | number | 横に並べるブロックの数 |
| `verticalBlocks` | number | アニメーション全体の縦の長さ（ブロック） |
| `blockSizeMultiplayer` | number | ブロックの大きさの倍率（基準値は16px） |
| `blockStackLevel` | number | 既に積み上がっているブロックの段数 |
| `animationSpeedMultiplayer` | number | アニメーション速度の倍率（基準値は1秒/落下ブロック） |

## 補助スクリプトについて
埋め込みHTMLファイルを作成する補助を行うTypescriptファイルがあります。使用するには[Node.js](https://nodejs.org/ja)が必要です（よっぽど古いバージョンでなければ動くハズ）。

### GenerateImageArray.ts
[./images/](./images/)内の画像ファイルをBase64変換し、配列形式として標準出力します。[FallingMinecraftBlocks.js](./FallingMinecraftBlocks.js)内の41行目`const images`にそのままペーストして使用できます。

### HTMLPacker.ts
分離しているHTML、スクリプトファイル、スタイルシートを1つのHTMLファイルに統合します。`output.html`という名前で出力されます。

また、GitHub Actionsのワークフローから、統合されたhtmlファイルを入手する事ができます。

## その他
- ブロックの画像はソースファイル内に埋め込まれています。外部サイト等から参照する事はありません。
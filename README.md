# 📱 レシート管理アプリ

レシートを撮影して自動で商品と金額を認識し、家計簿として管理できるReact Nativeアプリです。

## 🏆 アプリ実績

### App Store パフォーマンス
- **総ダウンロード数**: 10,900+ (2020年10月〜2023年9月)
- **App Store インプレッション**: 668,000+ 
- **プロダクトページビュー**: 61,900+
- **App Store Connect の契約が終了しているため現在は非公開**

### ユーザーからの評価
- レシート撮影の自動認識機能が高く評価されています
- シンプルで使いやすいUI/UX
- 家計管理の効率化に貢献

## 🚀 技術スタック

### React Native & Expo
- **React Native**: クロスプラットフォームモバイルアプリ開発
- **Expo**: 開発環境とビルドツール
- **Expo Camera**: カメラ機能
- **Expo File System**: ファイル操作
- **Expo Sharing**: ファイル共有機能
- **Expo Store Review**: アプリレビュー機能

### 状態管理
- **Redux**: アプリケーション全体の状態管理
- **React Redux**: ReactとReduxの連携
- **Redux Toolkit**: Reduxの簡素化ツール

### ナビゲーション
- **React Navigation**: 画面遷移とナビゲーション
- **Stack Navigator**: 画面スタック管理
- **Bottom Tab Navigator**: タブナビゲーション

### UI/UX
- **React Native Elements**: UIコンポーネントライブラリ
- **React Native Vector Icons**: アイコンライブラリ
- **React Native Loading Spinner**: ローディング表示
- **React Native Root Toast**: トースト通知
- **React Native Swipeout**: スワイプ操作
- **React Native Gesture Handler**: ジェスチャー操作

### 日付・時刻
- **Moment.js**: 日付・時刻の操作とフォーマット
- **React Native Community DateTimePicker**: 日時選択

### 広告
- **Expo AdMob**: Google AdMob広告の統合

## 🔍 Google Cloud Vision API

### 技術概要
レシートの自動認識には**Google Cloud Vision API**の**Document Text Detection**機能を使用しています。



### 処理フロー
1. **画像撮影**: カメラでレシートを撮影
2. **API送信**: Base64エンコードした画像をCloud Vision APIに送信
3. **テキスト抽出**: APIから返されたテキストデータを解析
4. **位置情報処理**: 文字の位置情報（X, Y座標）を基に行・列に整理
5. **商品・価格マッピング**: 価格記号（¥）を基準に商品名と価格を抽出
6. **データ整形**: アプリで使用可能な形式に変換

### 特徴
- **日本語手書き文字認識**: `ja-t-i0-handwrit`言語ヒントで手書き文字を高精度で認識
- **位置情報活用**: 文字の座標情報を利用して行・列を正確に判定
- **価格自動抽出**: ¥記号を基準に商品名と価格を自動マッピング

## 💾 データ保存・管理

### Redux Store構造
```javascript
// メインストア
const store = {
    receipt: {
        receipts: [] // レシートデータ配列
    },
    receiptId: {
        receiptId: 0 // レシートID（シーケンス）
    },
    category: {
        categories: [] // カテゴリデータ配列
    },
    targetMonth: {
        targetMonth: "" // 表示対象月
    }
};
```

### レシートデータ構造
```javascript
const receipt = {
    id: 1,                    // レシートID
    title: "スーパーマーケット", // タイトル
    createdAt: Date,          // 作成日時
    sum: 1500,               // 合計金額
    categoryId: 1,           // カテゴリID
    shoots: [                // 商品データ配列
        ["りんご", "200", "1"],
        ["バナナ", "150", "2"],
        // [商品名, 価格, 商品ID]
    ]
};
```

### データ永続化
- **AsyncStorage**: ローカルストレージでのデータ永続化
- **Redux Persist**: Redux状態の自動保存・復元
- **CSVエクスポート**: データの外部出力機能

### カテゴリ管理
- カスタムカテゴリの作成・編集・削除
- カテゴリ別の支出集計
- カラーピッカーによるカテゴリ色分け

## 🎨 UI/UX レイアウト

### アーキテクチャ
```
src/components/
├── ui/                    # 基本UIコンポーネント
│   ├── TitleComponents.js    # タイトル関連
│   ├── DateTimeComponents.js # 日時関連
│   ├── PriceComponents.js    # 価格表示関連
│   ├── ButtonComponents.js   # ボタン関連
│   └── RecordComponents.js   # レコード関連
├── feedback/              # フィードバック関連
│   └── FeedbackComponents.js # トースト、スピナー、オーバーレイ
├── ads/                   # 広告関連
│   └── AdComponents.js       # AdMob広告
├── camera/                # カメラ関連
│   └── CameraComponents.js   # カメラ撮影
├── list/                  # リスト関連
│   └── ListComponents.js     # 商品リスト、スワイプリスト
├── form/                  # フォーム関連
│   └── FormComponents.js     # カテゴリ編集
└── ReceiptDetailItem.js   # レシート詳細
```

### 画面構成
1. **月間画面**: カレンダー表示、月別集計、カテゴリ別グラフ
2. **撮影画面**: カメラ撮影、リアルタイムプレビュー
3. **設定画面**: カテゴリ管理、アプリ設定

## 📱 主要機能

### レシート撮影・認識
- カメラでのレシート撮影
- Google Cloud Vision APIによる自動文字認識
- 商品名と価格の自動抽出
- 手動編集機能

### データ管理
- レシートの保存・編集・削除
- カテゴリ別分類
- 日別・月別の集計表示
- CSV形式でのデータエクスポート

### 分析・可視化
- 月別支出グラフ
- カテゴリ別円グラフ
- 日別支出バーチャート
- 支出傾向の分析

## 🔧 開発環境セットアップ

### 必要な環境
- Node.js (v16以上)
- npm または yarn
- Expo CLI
- iOS Simulator / Android Emulator
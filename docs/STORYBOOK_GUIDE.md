# Storybook 배포 가이드

이 문서는 Storybook을 빌드하고 GitHub Pages에 배포하는 과정을 안내합니다.

## 사전 준비

배포를 진행하기 전에 Storybook에 새로운 컴포넌트나 스토리를 추가해야 합니다.

1.  **스토리 생성**: `stories` 또는 `.rnstorybook/stories` 디렉토리에 새로운 `.stories.tsx` 파일을 추가하거나 기존 파일을 수정합니다.

2.  **스토리 등록**: `storybook-generate` 스크립트를 실행하여 새로운 스토리를 Storybook에 등록합니다.

    ```bash
    pnpm storybook-generate
    ```

## Storybook 빌드

다음 명령어를 사용하여 Storybook을 정적 파일로 빌드합니다.

```bash
pnpm build-storybook
```

빌드가 완료되면 `storybook-static` 디렉토리가 생성됩니다. 이 디렉토리의 내용을 GitHub Pages에 배포합니다.

## GitHub Pages 배포

`storybook-static` 디렉토리를 GitHub Pages에 배포하는 방법에는 여러 가지가 있습니다. 여기서는 `gh-pages` 패키지를 사용하는 방법을 안내합니다.

1.  **`gh-pages` 패키지 설치**

    ```bash
    pnpm add -D gh-pages
    ```

2.  **`package.json`에 배포 스크립트 추가**

    `package.json` 파일의 `scripts` 섹션에 다음 내용을 추가합니다.

    ```json
    "scripts": {
      // ... 기존 스크립트
      "deploy-storybook": "gh-pages -d storybook-static"
    }
    ```

3.  **배포 실행**

    다음 명령어를 실행하여 Storybook을 GitHub Pages에 배포합니다.

    ```bash
    pnpm deploy-storybook
    ```

4.  **GitHub Pages 설정**

    - GitHub 저장소의 **Settings > Pages** 탭으로 이동합니다.
    - **Branch**를 `gh-pages`로 설정하고 **folder**를 `/(root)`로 선택한 후 저장합니다.
    - 잠시 후 표시되는 URL을 통해 배포된 Storybook을 확인할 수 있습니다.

## 자동 배포 (GitHub Actions)

매번 수동으로 배포하는 것이 번거롭다면 GitHub Actions를 사용하여 `main` 브랜치에 코드가 푸시될 때마다 자동으로 배포할 수 있습니다.

1.  **.github/workflows/deploy-storybook.yml** 파일을 생성하고 다음 내용을 추가합니다.

    ```yaml
    name: Deploy Storybook

    on:
      push:
        branches:
          - main

    jobs:
      deploy:
        runs-on: ubuntu-latest

        steps:
          - name: Checkout code
            uses: actions/checkout@v4

          - name: Set up Node.js
            uses: actions/setup-node@v4
            with:
              node-version: '20'
              cache: 'pnpm'

          - name: Install pnpm
            run: npm install -g pnpm

          - name: Install dependencies
            run: pnpm install

          - name: Build Storybook
            run: pnpm build-storybook

          - name: Deploy to GitHub Pages
            uses: peaceiris/actions-gh-pages@v3
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }}
              publish_dir: ./storybook-static
    ```

이제 `main` 브랜치에 변경 사항이 푸시되면 자동으로 Storybook이 빌드되고 `gh-pages` 브랜치에 배포됩니다.

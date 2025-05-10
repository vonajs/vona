import { metadataCustomSnippet } from "@cabloy/cli";
import { locale_transform } from "../utils.ts";

export default metadataCustomSnippet({
  file: "src/config/locale/zh-cn.ts",
  language: "gogo",
  async transform({ ast, argv }) {
    return locale_transform({ ast, argv });
  },
});

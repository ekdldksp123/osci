// import the original type declarations
import "react-i18next"
// import all namespaces (for the default language, only)
import * as ko from "../locales/ko"

// react-i18next versions higher than 11.11.0
declare module "react-i18next" {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: "todo"
    // custom resources type
    resources: {
      todo: typeof ko.todo
      //   about: typeof ko
    }
  }
}

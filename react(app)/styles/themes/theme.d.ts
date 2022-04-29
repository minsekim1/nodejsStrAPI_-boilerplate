// declare module "@mui/material/styles" {
//   interface Theme {
//     primary: {
//       main: string;
//     };
//     secondary: {
//       main: string;
//     };
//     error: {
//       main: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     primary: {
//       main: string;
//     };
//     secondary: {
//       main: string;
//     };
//     error: {
//       main: string;
//     };
//   }
// }

declare module "@mui/material/styles" {
  interface TypographyVariants {
    infoProgramSummaryItemSectionHeader: any;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    infoProgramSummaryItemSectionHeader?: any;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    infoProgramSummaryItemSectionHeader: true;
  }
}

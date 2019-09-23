/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.md' {
  const content: any;
  export default content;
}
declare module '*.gql' {
  const content: string;
  export default content;
}

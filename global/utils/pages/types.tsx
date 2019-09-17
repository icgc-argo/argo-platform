import * as React from 'react';

export type GetInitialPropsContext = {
  pathname: string;
  query: {
    [key: string]: any;
  };
  asPath: string;
  req?: any;
  res?: any;
  err?: Error;
};
export type ClientSideGetInitialPropsContext = {
  pathname: GetInitialPropsContext['pathname'];
  query: GetInitialPropsContext['query'];
  asPath: GetInitialPropsContext['asPath'];
};
type GetInitialPropsContextWithEgo = GetInitialPropsContext & {
  egoJwt?: string;
};
export type PageConfigProps = {
  isPublic: boolean;
  isAccessible: (args: { egoJwt?: string; ctx: GetInitialPropsContext }) => Promise<boolean>;
  getInitialProps: (args: GetInitialPropsContextWithEgo) => Promise<any>;
  getGqlQueriesToPrefetch: (
    args: GetInitialPropsContextWithEgo,
  ) => Promise<Array<{ query: any; variables?: { [key: string]: any } }>>;
};
export type PageWithConfig = PageConfigProps & React.ComponentType<any>;
import { useMemo } from "react";

import { ParsedUrlQuery } from "querystring";
import { Url } from "url";

import { useRouter } from "next/router";

// FuncUrlObject|UrlObject -> UrlReturnObject['query']
type GetUrlReturnObject<UrlObjectUnion extends FuncUrlObject | UrlObject> =
  UrlObjectUnion extends FuncUrlObject
    ? ReturnType<ReturnType<UrlObjectUnion>["$url"]>["query"]
    : UrlObjectUnion extends UrlObject
    ? ReturnType<UrlObjectUnion["$url"]>["query"]
    : never;

type UrlReturnObject = {
  pathname: string;
  query?: { [key: string]: string | string[] | number | undefined | any };
  hash: string | undefined;
};

type FuncUrlObject = (id: string | number) => {
  $url: (
    url?:
      | {
          hash?: string | undefined;
        }
      | undefined
  ) => UrlReturnObject;
};
type UrlObject = {
  $url: (
    url?:
      | {
          hash?: string | undefined;
        }
      | undefined
  ) => UrlReturnObject;
};

export const useRouterWrapper = <
  UrlObjectUnion extends FuncUrlObject | UrlObject,
  PushQueryParam = string | string[]
>() => {
  const router = useRouter();

  type QueryParam = GetUrlReturnObject<UrlObjectUnion>;

  // Winding ParsedUrlQuery->ParsedUrlQuery
  type AssertIsQueryParam = (
    value: ParsedUrlQuery | QueryParam
  ) => asserts value is QueryParam;
  const assertIsQueryParam: AssertIsQueryParam = (value) => {
    if (typeof value !== "object") {
      throw Error("router.query is not object");
    }
  };
  assertIsQueryParam(router.query);

  const query: QueryParam = router.query;

  const push = useMemo(
    () =>
      function (url: UrlReturnObject | (Url & { query?: PushQueryParam })) {
        router.push(url);
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { ...router, query, push };
};

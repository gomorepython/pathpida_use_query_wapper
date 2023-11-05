import { useRouterWrapper } from "@/hooks/useQueryWrapper";
import { pagesPath } from "@/lib/$path";
import Link from "next/link";

export type OptionalQuery = { hoge: string | number };

function IdPage() {
  const pagePath = pagesPath._id("id");
  const router = useRouterWrapper<typeof pagePath>();
  const hoge = router.query.hoge;

  return (
    <>
      <div>
        <div>IDページ</div>
        <div>id: {router.query.id}</div>
        <div>hoge: {hoge}</div>
      </div>
      <Link href={pagesPath.$url()} passHref>
        戻る
      </Link>
    </>
  );
}

export default IdPage;

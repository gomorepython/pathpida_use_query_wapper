import { useRouterWrapper } from "@/hooks/useQueryWrapper";
import { pagesPath } from "@/lib/$path";
import { type OptionalQuery } from "@/pages/[id]";

export default function Home() {
  const pagePath = pagesPath;

  const router = useRouterWrapper<typeof pagePath, OptionalQuery>();

  const onClickLink = () => {
    router.push(
      pagePath._id(1).$url({
        query: {
          hoge: "hogehoge",
        },
      })
    );
  };

  return (
    <div>
      <div>main</div>
      <button onClick={onClickLink}>click link</button>
    </div>
  );
}

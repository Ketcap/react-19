import dynamic from "next/dynamic";

const Component = dynamic(() => import("./custom-element"), {
  ssr: false,
});

export default function Page() {
  return <Component />;
}

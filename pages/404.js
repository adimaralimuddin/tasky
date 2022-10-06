import MainHeader from "../components/layouts/LayoutMainHeader";

export default function FourOhFour() {
  return (
    <div className="flex flex-col gap-2  min-h-screen">
      <MainHeader />
      <h2 className="text-center content-center flex-1 flex flex-cold gap-2 items-center justify-center p-2 text-3xl flex-wrap">
        Oops! Page Not Found
      </h2>
    </div>
  );
}

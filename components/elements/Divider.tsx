const Divider = (props: any) => {
  return (
    <>
      <p
        className={
          "text-center  text-sm text-slate-500 dark:border-layer-sec border-b-[1px] border-slate-200 " +
          props?.className
        }
      >
        {props?.children}
      </p>
    </>
  );
};
export default Divider;

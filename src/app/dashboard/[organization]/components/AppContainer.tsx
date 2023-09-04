function AppContainer(props: React.PropsWithChildren) {
  return (
    <div className={'w-full p-3 flex flex-col flex-1'}>{props.children}</div>
  );
}

export default AppContainer;

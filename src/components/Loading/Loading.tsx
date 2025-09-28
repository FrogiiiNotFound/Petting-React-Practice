import loading from 'images/loading.gif';

export const Loading = () => {
  return (
    <div className="py-block">
      <div className="_container p-[250px]">
        <div className="mx-auto max-w-[64px]">
          <img className="min-w-[100px]" src={loading} alt="" />
        </div>
      </div>
    </div>
  );
};

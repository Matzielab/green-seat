type Props = {
  title: string;
  description: string;
};

export const PageTitleAndDescription = ({ title, description }: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-50 md:text-2xl">
        {title}
      </h1>
      <p className="text-lg text-gray-100 mb-10 md:mb-6 md:text-base md:w-10/12">
        {description}
      </p>
    </div>
  );
};

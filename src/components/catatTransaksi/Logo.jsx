const Logo = () => (
  <div className="flex gap-1.5 items-center max-sm:justify-center max-sm:w-full">
    <div className="flex flex-col gap-1.5 justify-center items-center h-[35px] w-[104px] max-sm:h-[41px] max-sm:w-[41px]">
      <h1 className="text-3xl font-medium leading-10 text-gray-900 max-md:text-2xl whitespace-nowrap">
        KEUKU
      </h1>
      <p className="text-base leading-10 text-center text-gray-900 max-md:text-xs whitespace-nowrap">
        Keuanganku
      </p>
    </div>
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ddcbb0da4d14090bf259e59c5c699d07a852743?placeholderIfAbsent=true"
      alt="Keuku Logo"
      className="w-[41px] h-[41px] max-sm:w-[35px] max-sm:h-[35px] object-contain"
    />
  </div>
);

export default Logo;

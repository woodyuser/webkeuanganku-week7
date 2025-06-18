import React from 'react';

export const ContactSection = () => { // className prop dihapus karena parent AboutPage yang akan mengaturnya
  return (
    <section className="flex relative flex-col gap-5 items-center w-full">
      <h2 className="relative self-stretch text-base font-medium text-center text-neutral-800">
        BILA ADA PERTANYAAN
      </h2>
      <p className="relative self-stretch text-base text-center text-neutral-800">
        Hubungi kami di<br />
        www.gmail@gmail.com
      </p>
    </section>
  );
};
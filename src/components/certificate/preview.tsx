import Image from 'next/image';

export function CertificatePreview({ name = "John Doe", overallScore = "7.5" }) {
  return (
    <div className="relative w-full aspect-[1.4] bg-white rounded-lg overflow-hidden border">
      <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-serif text-gray-800">Certificate of Achievement</h2>
        <div className="my-4 w-full max-w-[500px] h-[1px] bg-gray-300" />
        <p className="text-lg text-gray-700">This is to certify that</p>
        <p className="text-xl font-bold text-gray-900 mt-2">{name}</p>
        <p className="text-lg text-gray-700 mt-4">
          has achieved an Overall Band Score of
        </p>
        <p className="text-3xl font-bold text-primary mt-2">{overallScore}</p>
        <p className="text-lg text-gray-700 mt-4">in the</p>
        <p className="text-xl font-bold text-gray-900 mt-2">
          IELTS Academic Test
        </p>
        <div className="absolute bottom-8 left-8">
          <p className="text-sm text-gray-500">Date of Issue</p>
          <p className="text-sm font-medium text-gray-700">
            {new Date().toLocaleDateString()}
          </p>
        </div>
        <Image
          src="/watermark.png"
          alt="Watermark"
          width={200}
          height={200}
          className="absolute opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}

import Image from 'next/image';
export function CartItem() {
  return (
    <li className="flex items-start space-x-4">
      <Image
        className="flex-shrink-0 h-72 w-72 rounded-md"
        width={0}
        height={0}
        sizes="50vw"
        src="https://img.ltwebstatic.com/images3_pi/2024/01/16/9d/17053888633bdef6f45a8836610635a9313cf35a09_thumbnail_405x552.webp"
        referrerPolicy="no-referrer"
        alt="Product Image"
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium text-gray-900">Product Name</h3>
        <p className="text-sm text-gray-500">
          Description or options (optional)
        </p>
      </div>
      <div className="flex-shrink-0 ml-4">
        <span className="text-gray-700">Quantity: 1</span>
      </div>
      <div className="flex-shrink-0 ml-4">
        <span className="text-gray-700">$19.99</span>
      </div>
    </li>
  );
}

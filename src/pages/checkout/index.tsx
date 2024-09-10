import React, { useEffect, useState } from "react";
import { LayoutTemplates as Layout } from "@/components/templates/Layouts/LayoutTemplates";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import Cookies from "universal-cookie";
import { ModalAlertAtoms } from "@/components/atoms/Modals/ModalAlertAtoms";
import { tree } from "next/dist/build/templates/app-page";

interface Address {
  id: number;
  address_label: string;
  recipient: string;
  address: string;
  village: string;
  district: string;
  city: string;
  province: string;
  postal_code: string;
  phone: string;
}

const addresses: Address[] = [
  {
    id: 1,
    address_label: "Rumah",
    recipient: "Adit",
    address: "Jl. Kebon Jeruk No. 1, Jakarta Barat",
    village: "Kebon Jeruk",
    district: "Kebon Jeruk",
    city: "Jakarta Barat",
    province: "DKI Jakarta",
    postal_code: "11530",
    phone: "08123456789",
  },
  {
    id: 2,
    address_label: "Kantor",
    recipient: "Anderson Silva",
    address:
      "Jl. Jatingaleh No.207, Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50131",
    village: "Pendrikian Kidul",
    district: "Semarang Tengah",
    city: "Semarang",
    province: "Jawa Tengah",
    postal_code: "50131",
    phone: "08123456789",
  },
  // Tambahkan data alamat lainnya jika diperlukan
];
interface Product {
  cart_id: string;
  image: string;
  img: string;
  price: number;
  price_discount: number;
  product_id: string;
  quantity: number;
  size: string;
  // sub_total: number;
  title: string;
}
interface Voucher {
  id: number;
  code: string;
  discount: number;
}
const vouchers: Voucher[] = [
  {
    id: 1,
    code: "Discount20%",
    discount: 20000,
  },
  {
    id: 2,
    code: "Discount30%",
    discount: 30000,
  },
  {
    id: 3,
    code: "Discount40%",
    discount: 30000,
  },
];
interface Shipping {
  id: number;
  shipping: string;
  logo: string;
  estimated: string;
  cost: number;
}
interface Payment {
  id: number;
  bank_name: string;
  bank_number: string;
  logo: string;
}
const Checkout = () => {
  const {
    isOpen: isFirstModalOpen,
    onOpen: openFirstModal,
    onOpenChange: onFirstModalOpenChange,
  } = useDisclosure();

  // State for second modal
  const {
    isOpen: isSecondModalOpen,
    onOpen: openSecondModal,
    onOpenChange: onSecondModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isThirdModalOpen,
    onOpen: openThirdModal,
    onOpenChange: onThirdModalOpenChange,
  } = useDisclosure();
  const [addressState, setAddressState] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [concatenatedAddress, setConcatenatedAddress] = useState<string>("");
  const [namePlaceAddress, setNamePlaceAddress] = useState<string>("");
  const [placeAddress, setPlaceAddress] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [productOrder, setProductOrder] = useState<Product[]>([]);
  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedShipping, setSelectedShipping] = useState<Shipping | null>(
    null
  );
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [shipping, setShipping] = useState<Shipping[]>([]);
  const [payment, setPayment] = useState<Payment[]>([]);
  const [isOpenShipping, setIsOpenShipping] = useState(false);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);

  const toggleOpenShipping = () => setIsOpenShipping(!isOpenShipping);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [notes, setNotes] = useState("");
  const cookies = new Cookies();

  const formatRupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleApplyAddress = (address: Address, onClose: () => void) => {
    setSelectedAddress(address);
    const concatenatedAddress = `${address.phone}, ${address.address}, ${address.village}, ${address.district}, ${address.city}, ${address.province} ${address.postal_code}`;
    setConcatenatedAddress(concatenatedAddress);
    const nameOnAddress = `${address.address_label} - ${address.recipient}`;
    setNamePlaceAddress(nameOnAddress);
    const places = `${address.address}, ${address.village}, ${address.district}, ${address.city}, ${address.province} ${address.postal_code}`;
    setPlaceAddress(places);
    onClose();
  };
  const handleApplyVoucher = (vouchers: Voucher, onClose: () => void) => {
    const discountPrice = vouchers.discount;
    setDiscountPrice(discountPrice);
    onClose();
  };
  const handleNotesChange = (event: any) => {
    setNotes(event.target.value);
  };
  const handlePayment = async (onClose: () => void) => {
    setIsLoadingOrder(true);
    try {
      const params = new URLSearchParams();
      params.append("sub_total", getOrderTotal().toString());
      if (selectedShipping) {
        params.append("shipping_id", selectedShipping?.id.toString());
      }
      if (selectedVoucher) {
        params.append("discount", discountPrice.toString());
      }
      if (notes) params.append("notes", notes);
      if (selectedPayment) {
        params.append("payment_method_id", selectedPayment?.id.toString());
      }
      if (concatenatedAddress) params.append("alamat", concatenatedAddress);
      if (selectedProducts.length > 0)
        params.append("product", JSON.stringify(selectedProducts));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/checkout/order`,
        params,
        {
          headers: {
            Authorization: cookies.get("token"),
          },
        }
      );
      if (response.data.status == 200) {
        console.log("test", response);

        setIsSuccess(true);
        setShowModal(true);
        setModalMessage("Success Order");
      } else {
        setShowModal(true);
        setIsSuccess(false);
        setModalMessage("Failed Order");
      }
      onClose();
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem("selectedProducts");
    if (storedProducts) {
      setSelectedProducts(JSON.parse(storedProducts));
    }
  }, []);

  const fetchShipping = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/reference/shipping`
      );
      if (response.status == 200) {
        setShipping(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching shipping:", error);
    }
  };
  useEffect(() => {
    fetchShipping();
    fetchPayment();
  }, []);

  useEffect(() => {
    if (selectedProducts.length > 0) {
      fetchProductOrder();
    }
  }, [selectedProducts]);

  const fetchProductOrder = async () => {
    setIsLoading(true);
    const requestBody = {
      cart_id: selectedProducts,
    };
    const param = new URLSearchParams();
    if (selectedProducts.length > 0)
      param.append("cart_id", JSON.stringify(requestBody.cart_id));

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/checkout/productorder?${param}`,
        {
          headers: {
            Authorization: cookies.get("token"),
          },
        }
      );
      if (response.status == 200) {
        setProductOrder(response.data.data.product);
        setTotalProductPrice(response.data.data.sub_total_all);
      }
    } catch (error) {
      console.error("Error fetching product order:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchPayment = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/reference/payment`
      );
      if (response.status == 200) {
        setPayment(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching payment:", error);
    }
  };

  const getOrderTotal = () => {
    let totalPrice = totalProductPrice;

    if (selectedShipping) {
      totalPrice += selectedShipping?.cost;
    }

    if (discountPrice) {
      totalPrice -= discountPrice;
    }

    return totalPrice || 0;
  };
  return (
    <>
      <Layout title="Checkout">
        <section className="container mx-auto px-25 bg-primary-50 h-full pb-[162px]">
          <div className="py-27 flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <img
                src="/icon/arrow-left.svg"
                alt="arrow-left"
                className="w-4 h-4"
              />
              <h3 className="text-base text-primary-800 font-semibold">
                Back to Cart
              </h3>
            </div>
            <h1 className="text-32 font-semibold text-primary-800">Checkout</h1>
          </div>
          <div className="mt-12 grid grid-cols-12 gap-5">
            <div className="col-span-9">
              <div className="py-4 px-18 flex gap-3 justify-between items-center bg-white rounded-lg">
                <div className="flex flex-col gap-fourtheen w-full">
                  <h3 className="text-primary-800 text-lg font-bold">
                    Shipping Address
                  </h3>
                  {namePlaceAddress && (
                    <div className="flex gap-3">
                      <img src="/icon/location.svg" alt="location icon" />
                      <span className="text-black text-base font-semibold">
                        {namePlaceAddress}
                      </span>
                    </div>
                  )}
                  {placeAddress && (
                    <p className="text-sm text-black font-semibold">
                      {placeAddress}
                    </p>
                  )}
                </div>
                <Button
                  onPress={openFirstModal}
                  className="rounded-lg w-fit text-white font-semibold bg-primary-800 hover:bg-primary-700  active:scale-90 transition-all duration-300 flex gap-2 items-center py-ten px-4 border-none focus:border-none focus:outline-none focus:ring-0"
                >
                  <img src="/icon/edit.svg" alt="edit" className="w-4 h-4" />
                  <span className="text-sm font-semibold text-white">
                    {selectedAddress ? "Edit" : "Select Address"}
                  </span>
                </Button>
                <Modal
                  isOpen={isFirstModalOpen}
                  onOpenChange={onFirstModalOpenChange}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1  border-b border-divider-400">
                          My Address
                        </ModalHeader>
                        <ModalBody className="p-5 flex gap-fourtheen flex-col">
                          {addresses.map((address) => (
                            <div
                              key={address.id}
                              className="border border-solid border-divider-400 p-4 rounded-lg flex gap-4 items-center"
                            >
                              <input
                                type="radio"
                                name="choose-address"
                                value={address.id}
                                className="full-rounded-checkbox"
                                checked={selectedAddress?.id === address.id}
                                onChange={() => setSelectedAddress(address)}
                              />
                              <div className="flex gap-1 flex-col">
                                <div className="flex gap-3">
                                  <img
                                    src="/icon/location.svg"
                                    alt="location icon"
                                    className="w-[14px] h-[14px]"
                                  />
                                  <span className="text-black text-xs font-semibold">
                                    {address.address_label}
                                  </span>
                                </div>
                                <h4 className="font-semibold text-sm">
                                  {address.recipient} |
                                  <span className="font-normal">
                                    {" "}
                                    {address.phone}
                                  </span>
                                </h4>
                                <p className="text-divider-500 font-normal text-xs">
                                  {address.address}, {address.village},{" "}
                                  {address.district}, {address.city},{" "}
                                  {address.province} {address.postal_code}
                                </p>
                              </div>
                              <Button className="bg-none">Edit</Button>
                            </div>
                          ))}
                          <Button
                            className="button-style"
                            onPress={() =>
                              selectedAddress &&
                              handleApplyAddress(selectedAddress, onClose)
                            }
                          >
                            Apply Address
                          </Button>
                        </ModalBody>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
              {/* Product and Shipping */}
              <div className="flex flex-col gap-4 py-4 px-[1.125rem] bg-white rounded-lg mt-6">
                <h3 className="font-bold text-primary-800 text-base">
                  Product Order
                </h3>

                {isLoading
                  ? Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-42">
                          <div className="max-w-[100px] bg-primary-50 rounded-lg">
                            <div className="font-semibold text-lg text-black w-[100px] h-[100px] rounded bg-divider-400 animate-pulse"></div>
                          </div>
                          <div className="flex flex-col gap-6">
                            <div className="font-semibold text-lg text-black w-20 h-5 rounded bg-divider-400 animate-pulse"></div>
                            <div className="flex gap-1 w-full items-center">
                              <div className="font-semibold text-lg text-black w-24 h-5 rounded bg-divider-400 animate-pulse"></div>
                              <div className="font-semibold text-lg text-black w-20 h-5 rounded bg-divider-400 animate-pulse"></div>
                            </div>
                            <div className="font-semibold text-lg text-black w-16 h-5 rounded bg-divider-400 animate-pulse"></div>
                          </div>
                        </div>
                        <div className="font-semibold text-lg text-black w-28 h-5 rounded bg-divider-400 animate-pulse"></div>
                      </div>
                    ))
                  : productOrder.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-42">
                          <div className="max-w-[100px] bg-primary-50 rounded-lg">
                            <img
                              src="/images/img-card.png"
                              alt="card"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-[6px]">
                            <h4 className="font-semibold text-base">
                              {item?.title}
                            </h4>
                            <div className="flex gap-1 w-full items-center">
                              <s className="font-bold text-primary-900 text-sm">
                                {formatRupiah(item?.price)}
                              </s>
                              <p className="font-bold text-primary-700 text-sm">
                                {formatRupiah(item?.price_discount)}
                              </p>
                            </div>
                            <span className="text-sm text-primary-700 font-semibold">
                              Size : {item?.size}
                            </span>
                          </div>
                        </div>
                        <span className="text-base font-semibold">
                          {item?.quantity} x{" "}
                          {formatRupiah(item?.price_discount)}
                        </span>
                      </div>
                    ))}
                <div className="border-t border-solid border-divider-400 pt-2">
                  <h3 className="font-bold text-primary-800 text-base">
                    Choose Shopping Services
                  </h3>
                  <div className="mt-6">
                    <div
                      onClick={toggleOpenShipping}
                      className="flex justify-between items-center p-ten border border-solid border-divider-400 rounded-lg cursor-pointer"
                    >
                      <h3 className="font-semibold text-base text-black">
                        Pilih Pengiriman
                      </h3>

                      <img
                        src="/icon/discount-arrow.svg"
                        alt="arrow"
                        className={`w-6 h-6 transition-transform duration-300 ${
                          isOpenShipping ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </div>
                    {/*  */}
                    {isOpenShipping && (
                      <div className="border border-solid border-divider-400 rounded-b-lg border-t-0">
                        {shipping.map((item, index) => (
                          <div
                            className="flex items-center justify-between gap-3 border-b border-solid border-divider-400 p-ten"
                            key={index}
                          >
                            <div className="flex gap-3">
                              <input
                                type="radio"
                                name="choose-shipping"
                                value={item?.id}
                                className="full-rounded-checkbox w-4 h-4"
                                checked={selectedShipping?.id === item.id}
                                onChange={() => setSelectedShipping(item)}
                              />
                              <div>
                                <h3 className="font-semibold text-base text-black">
                                  {item?.shipping}
                                </h3>
                                <p className="text-primary-800 font-semibold text-sm">
                                  Estimated Delivery : {item?.estimated} Days
                                </p>
                              </div>
                            </div>
                            <span className="text-sm text-primary-800 font-normal">
                              {formatRupiah(item?.cost)}
                            </span>
                            <div className="max-w-20">
                              <img
                                src={item?.logo}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Delivery */}
            </div>
            <div className="col-span-3">
              <div className="py-ten px-4 bg-white rounded-lg">
                <h3 className="text-primary-800 font-bold text-lg">
                  Order Sumary
                </h3>
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex justify-between items-center">
                    <span className="text-primary-800 font-normal text-sm">
                      Subtotal Product
                    </span>
                    <span className="text-primary-800 font-semibold text-sm">
                      {formatRupiah(totalProductPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-800 font-normal text-sm">
                      Delivery
                    </span>
                    <span className="text-primary-800 font-semibold text-sm">
                      {formatRupiah(selectedShipping?.cost || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-800 font-normal text-sm">
                      Voucher
                    </span>
                    <span className="text-primary-800 font-semibold text-sm">
                      - {formatRupiah(discountPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-800 font-normal text-sm">
                      Order Total
                    </span>
                    <span className="text-primary-800 font-semibold text-sm">
                      {formatRupiah(getOrderTotal())}
                    </span>
                  </div>
                  {/* Voucher */}
                  <Button
                    onPress={openSecondModal}
                    className="flex items-center justify-between bg-primary-50 border border-solid border-primary-400 px-4 py-6 rounded-lg"
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        src="/icon/discount-yellow.svg"
                        alt="voucher"
                        className="w-[21px] h-[21px]"
                      />
                      <span className="font-semibold text-sm">Voucher</span>
                    </div>
                    <img
                      src="/icon/discount-arrow.svg"
                      alt="arrow"
                      className="w-6 h-6"
                    />
                  </Button>
                  <Modal
                    isOpen={isSecondModalOpen}
                    onOpenChange={onSecondModalOpenChange}
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1  border-b border-divider-400">
                            Voucher
                          </ModalHeader>
                          <ModalBody className="p-5 flex gap-fourtheen flex-col">
                            {vouchers.map((voucher) => (
                              <div
                                key={voucher.id}
                                className="border border-solid border-divider-400 p-4 rounded-lg flex gap-4 items-center"
                              >
                                <input
                                  type="radio"
                                  name="choose-voucher"
                                  value={voucher.id}
                                  className="full-rounded-checkbox"
                                  checked={selectedVoucher?.id === voucher.id}
                                  onChange={() => setSelectedVoucher(voucher)}
                                />
                                <div className="flex gap-1 flex-col">
                                  <div className="flex flex-col gap-2">
                                    <span className="text-base font-semibold">
                                      {voucher.code}
                                    </span>
                                    <span className="text-sm font-medium text-divider-500">
                                      {formatRupiah(voucher.discount)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button
                              className="button-style"
                              onPress={() =>
                                selectedVoucher &&
                                handleApplyVoucher(selectedVoucher, onClose)
                              }
                            >
                              Apply Voucher
                            </Button>
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal>

                  {/* Notes */}

                  <textarea
                    name="notes"
                    id="notes"
                    cols={10}
                    rows={5}
                    className="w-full p-4 rounded-lg border border-solid border-divider-400 outline-none"
                    placeholder="Notes"
                    onChange={handleNotesChange}
                  ></textarea>

                  {/* Order Payment */}
                  <Button
                    onPress={openThirdModal}
                    className="rounded-[6px] w-full text-white font-semibold py-6 active:scale-90 transition-all duration-300 bg-primary-800 hover:bg-primary-700"
                    isDisabled={
                      selectedShipping === null || selectedAddress === null
                    }
                  >
                    Choose Payment
                  </Button>
                  <Modal
                    isOpen={isThirdModalOpen}
                    onOpenChange={onThirdModalOpenChange}
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1  border-b border-divider-400">
                            Payment Method
                          </ModalHeader>
                          <ModalBody className="p-5 flex gap-fourtheen flex-col">
                            <div className="flex justify-between">
                              <h3 className="text-sm font-semibold">
                                Order Total{" "}
                              </h3>
                              <span className="text-sm font-semibold">
                                {formatRupiah(getOrderTotal())}
                              </span>
                            </div>
                            {payment.map((payment) => (
                              <div
                                key={payment.id}
                                className="border border-solid border-divider-400 p-4 rounded-lg flex gap-4 items-center justify-between"
                              >
                                <img
                                  src={payment?.logo}
                                  alt={payment?.bank_name}
                                  className="w-[83px] h-[42px]"
                                />

                                <div className="flex gap-1 flex-col">
                                  <div className="flex flex-col gap-2">
                                    <span className="text-base font-semibold">
                                      {payment?.bank_name}
                                    </span>
                                    <span className="text-sm font-medium text-divider-500">
                                      {payment?.bank_number}
                                    </span>
                                  </div>
                                </div>
                                <input
                                  type="radio"
                                  name="choose-paument"
                                  value={payment.id}
                                  className="full-rounded-checkbox w-4 h-4"
                                  checked={selectedPayment?.id === payment.id}
                                  onChange={() => setSelectedPayment(payment)}
                                />
                              </div>
                            ))}
                            <Button
                              className={`rounded-lg w-full text-white font-semibold bg-primary-800 hover:bg-primary-700 button-hover-effect duration-300 flex gap-2 items-center py-ten px-4 border-none focus:border-none focus:outline-none focus:ring-0 ${
                                isLoadingOrder ? "bg-divider-500" : ""
                              }`}
                              onPress={() =>
                                selectedPayment && handlePayment(() => {})
                              }
                              isDisabled={isLoadingOrder}
                            >
                              {isLoadingOrder ? "Processing..." : "Order Now"}
                            </Button>
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ModalAlertAtoms
          message={modalMessage}
          link="/history-transaction"
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          isSuccess={isSuccess}
        />
      </Layout>
    </>
  );
};
export default Checkout;

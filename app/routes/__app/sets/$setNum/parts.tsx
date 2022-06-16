import { Dialog } from "@headlessui/react";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { getParts, LegoPart } from "~/api";

type LoaderData = {
  parts: LegoPart[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const parts = await getParts(params.setNum);

  if (!parts || parts.length === 0) {
    throw new Response("No parts found for set", { status: 404 });
  }

  return json<LoaderData>({ parts });
};

export default function PartsView() {
  const { parts } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const params = useParams();

  const onClose = () => navigate(`/sets/${params.setNum}`);

  return (
    <Modal title="Parts" onClose={onClose}>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Color
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {parts.map((part) => (
                    <tr key={part.id}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {part.part.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {part.color.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {part.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

type ModalProps = {
  title: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => (
  <Dialog as="div" className="relative z-10" open={true} onClose={onClose}>
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-md sm:p-6">
          <div>
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {title}
            </Dialog.Title>

            {children}
          </div>
        </Dialog.Panel>
      </div>
    </div>
  </Dialog>
);

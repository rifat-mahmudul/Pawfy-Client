import PropTypes from 'prop-types'

const DonatorsModal = ({ isOpen, data, onClose }) => {
    if (!isOpen) return null;

    console.log(data)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
                <h2 className="text-xl font-bold text-center mb-4">Donators List</h2>
                <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Name</th>
                                <th className="border-b p-2">Email</th>
                                <th className="border-b p-2">Donation Amount ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    {/* <td className="border-b p-2">{donator?.name}</td>
                                    <td className="border-b p-2">{donator?.email}</td> */}
                                    {/* <td className="border-b p-2">{donator?.amount}</td> */}
                                </tr>
                        </tbody>
                    </table>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

DonatorsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data : PropTypes.object
};

export default DonatorsModal;

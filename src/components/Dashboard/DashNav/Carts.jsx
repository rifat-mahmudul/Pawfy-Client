import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const Carts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure('/users');
      return data;
    },
  });

  const { data: pets = [] } = useQuery({
    queryKey: ['total-pets'],
    queryFn: async () => {
      const { data } = await axiosSecure('/pets');
      return data;
    },
  });

  const { data: adoptionRequest = [] } = useQuery({
    queryKey: ['total-adoptionRequest'],
    queryFn: async () => {
      const { data } = await axiosSecure('/adopt-request');
      return data;
    },
  });

  const { data: allDonation = [] } = useQuery({
    queryKey: ["all-donation"],
    queryFn: async () => {
        const { data } = await axiosSecure(`/all-donations`);
        return data;
    },
  });

  // Preparing dynamic data for chart
  const chartData = [
    { name: 'All Users', count: users.length },
    { name: 'Total Pets', count: pets.length },
    { name: 'Adoption Req.', count: adoptionRequest.length },
    { name: 'Total Donations', count: allDonation.length },
  ];

  return (
    <div>
      <BarChart
        width={610}
        height={320}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default Carts;
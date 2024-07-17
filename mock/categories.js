import { Ionicons, Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const categories = [
  {
    label: 'Food',
    value: 'food',
    icon: <Ionicons name="fast-food-outline" size={24} color="black" />,
  },
  {
    label: 'Transport',
    value: 'transport',
    icon: <AntDesign name="car" size={24} color="black" />,
  },
  {
    label: 'Pets',
    value: 'pets',
    icon: <FontAwesome5 name="dog" size={24} color="black" />,
  },
  {
    label: 'Health',
    value: 'health',
    icon: <MaterialCommunityIcons name="yoga" size={24} color="black" />,
  },
  {
    label: 'Furniture',
    value: 'furniture',
    icon: <MaterialCommunityIcons name="table-furniture" size={24} color="black" />,
  },
  {
    label: 'Study',
    value: 'study',
    icon: <Entypo name="book" size={24} color="black" />,
  },
  {
    label: 'Gift',
    value: 'gift',
    icon: <AntDesign name="gift" size={24} color="black" />,
  },
];

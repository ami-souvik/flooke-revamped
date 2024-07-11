import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const COLUMNS = 3;
const Row = ({ children }) => <View style={styles.row}>{children}</View>;

export interface CategoryItem {
  label: string;
  value: string;
  icon?: React.JSX.Element;
}

export default function CategoryCase({
  items,
  onSelect,
  onClose,
}: {
  items: CategoryItem[];
  onSelect: (v: string) => void;
  onClose: () => void;
}) {
  return (
    <View style={styles.container}>
      {[...Array(Math.ceil(items.length / COLUMNS)).keys()].map((n) => (
        <Row key={n}>
          {items.slice(n * COLUMNS, n * COLUMNS + COLUMNS).map((each) => (
            <Pressable
              key={each.value}
              style={styles.item}
              onPress={() => {
                onSelect(each.value);
                onClose();
              }}
            >
              {each.icon && each.icon}
              <Text style={{ paddingLeft: 4 }}>{each.label}</Text>
            </Pressable>
          ))}
        </Row>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: 'auto',
  },
  row: {
    flexDirection: 'row',
    height: 64,
  },
  item: {
    width: `${100 / COLUMNS}%`,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

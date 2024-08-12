import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { IconButton, Surface } from 'react-native-paper';
import { useStateDisclose } from '@/hooks/useDisclose';
import { useSQlite } from '@/contexts/DBProvider';
import InputField from '@/components/form/InputField';
import { DBCategory } from '@/database/schemas/category';
import { Header } from '@/components/Header';
import { Actionsheet, Button, Hstack, SafeAreaView, Text, Vstack } from '@/components/primitive';
import { useThemeColor } from '@/hooks/useThemeColor';
import Record from '@/components/layout/Record';
import SegmentedButtonsBase from '@/components/form/base/SegmentedButtonsBase';
import { router } from 'expo-router';

export default function Category() {
  const colors = useThemeColor();
  const { categories, refreshCategory, saveCategory, deleteCategory } = useSQlite();
  const { state, onOpen, onClose } = useStateDisclose<DBCategory>(null);
  const [type, setType] = useState('category');
  const [filter, setFilter] = useState('expense');
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      value: '',
    },
  });
  useEffect(() => {
    if (state) {
      setValue('value', state?.value || '');
    }
  }, [state]);
  useEffect(() => {
    refreshCategory();
  }, []);
  const onSubmit = (data: DBCategory) => {
    if (state.id) data.id = state.id;
    saveCategory(data);
    onClose();
  };
  const onDelete = () => {
    deleteCategory(state?.id);
    onClose();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 12,
      }}
    >
      <Actionsheet isOpen={!!state} onClose={onClose} height={480}>
        <Vstack style={{ width: '100%', marginHorizontal: 'auto' }}>
          <Hstack>
            <View style={{ flex: 1 }}>
              <InputField autoFocus control={control} name="value" label="Category" />
            </View>
          </Hstack>
          <Button onPress={handleSubmit(onSubmit)}>Save Category</Button>
        </Vstack>
        {state?.id && (
          <View style={{ flexDirection: 'row' }}>
            <IconButton icon="delete" onPress={onDelete} />
          </View>
        )}
      </Actionsheet>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <SegmentedButtonsBase
            value={type}
            onValueChange={setType}
            buttons={[
              {
                value: 'account',
                label: 'Account',
              },
              {
                value: 'category',
                label: 'Category',
              },
            ]}
          />
          <SegmentedButtonsBase
            value={filter}
            onValueChange={setFilter}
            buttons={[
              {
                value: 'income',
                label: 'Income',
              },
              {
                value: 'expense',
                label: 'Expense',
              },
            ]}
          />
        </View>
        <IconButton icon="close" size={24} onPress={() => router.back()} style={styles.closeButton} />
      </View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Pressable onPress={() => onOpen(item)}>
            <Record values={[item.value]} />
          </Pressable>
        )}
      />
      <Pressable onPress={() => onOpen({})} style={{ flexDirection: 'row', backgroundColor: colors.foreground }}>
        <Text style={{ flex: 1, padding: 12 }}>Add Category</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  closeButton: {
    margin: 0,
    marginLeft: 6,
    backgroundColor: 'white',
  },
});

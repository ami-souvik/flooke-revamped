import React, { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import { Actionsheet } from 'native-base';
import { useStateDisclose } from '@/hooks/useDisclose';
import { useSQlite } from '@/contexts/DBProvider';
import InputField from '@/components/form/InputField';
import { DBCategory } from '@/database/schemas/category';
import { Header } from '@/components/Header';

export default function Category() {
  const { categories, refreshCategory, saveCategory, deleteCategory } = useSQlite();
  const { state, onOpen, onClose } = useStateDisclose<DBCategory>(null);
  const [type, setType] = useState('category');
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
  const onSubmit = (data) => {
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
        margin: 12,
      }}
    >
      <Actionsheet isOpen={!!state} onClose={onClose}>
        <Actionsheet.Content style={{ height: 480 }}>
          <View style={{ width: '100%', marginHorizontal: 'auto' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <InputField autoFocus control={control} name="value" label="Category" />
              </View>
            </View>
            <Button title="Save Category" onPress={handleSubmit(onSubmit)} />
          </View>
          {state?.id && (
            <View style={{ flexDirection: 'row' }}>
              <IconButton icon="delete" onPress={onDelete} />
            </View>
          )}
        </Actionsheet.Content>
      </Actionsheet>
      <Header
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
        value={type}
        setValue={setType}
      />
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Pressable onPress={() => onOpen(item)} style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, padding: 12, fontFamily: 'mukta-reg' }}>{item.value}</Text>
          </Pressable>
        )}
      />
      <Pressable onPress={() => onOpen({})} style={{ flexDirection: 'row', backgroundColor: 'white' }}>
        <Text style={{ flex: 1, padding: 12, fontFamily: 'mukta-reg' }}>Add Category</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

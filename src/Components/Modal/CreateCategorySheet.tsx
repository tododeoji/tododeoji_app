import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View, Keyboard, Alert } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { CloseIcon } from '../../assets/icons';
import { ConfirmButton, H, Text, TouchableSVG } from '../Common';
import { FontFamily, FontStyle } from '../../Common/Font';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import Color from '../../Common/Color';
import { TextInput } from 'react-native-gesture-handler';
import { useBottomSheetStore } from '../../stores/home';

interface CreateCategorySheetProps {
  onCloseSheet: (ref: any) => void;
  insetsBottom: number;
}

const CreateCategorySheet = forwardRef<BottomSheetModal, CreateCategorySheetProps>(
  ({ onCloseSheet, insetsBottom }: CreateCategorySheetProps, ref) => {
    const { data } = useBottomSheetStore();
    const categoryColorList = [
      'red1',
      'orange1',
      'yellow1',
      'green1',
      'blue1',
      'purple1',
      'pink1',
      'gray1',
      'red2',
      'orange2',
      'yellow2',
      'green2',
      'blue2',
      'purple2',
      'pink2',
      'gray2',
    ] as const;
    const [selectedCategoryColor, setSelectedCategoryColor] = useState<
      | 'red1'
      | 'orange1'
      | 'yellow1'
      | 'green1'
      | 'blue1'
      | 'purple1'
      | 'pink1'
      | 'gray1'
      | 'red2'
      | 'orange2'
      | 'yellow2'
      | 'green2'
      | 'blue2'
      | 'purple2'
      | 'pink2'
      | 'gray2'
    >();
    const inputRef = useRef<TextInput>(null);
    const [categoryName, setCategoryName] = useState('');

    const resetData = useCallback(() => {
      setSelectedCategoryColor(undefined);
      setCategoryName('');
    }, []);

    useEffect(() => {
      data && setCategoryName(data.title);
    }, [data]);

    const handleSheetChange = useCallback((index: number) => {
      if (index === 0) {
        // inputRef.current?.focus();
      } else {
        // closeModal();
        resetData();
      }
    }, []);

    const closeModal = () => {
      Keyboard.dismiss();
      setTimeout(() => {
        onCloseSheet(ref);
      }, 50);
    };

    const onSubmit = () => {
      if (!categoryName.length) Alert.alert('카테고리 이름을 입력해주세요');
      else if (!selectedCategoryColor && !data?.color) Alert.alert('카테고리 색상을 선택해주세요');
      else {
        Alert.alert(`submit!!!!!!!!!!!!! ${selectedCategoryColor || data?.color}, ${categoryName}`);
        closeModal();
      }
    };

    const renderBackdrop = useCallback(
      (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          style={styles.backdrop}
          appearsOnIndex={0}
          opacity={0.4}
          disappearsOnIndex={-1}
          onPress={closeModal}
        />
      ),
      [],
    );
    return (
      <BottomSheetModal
        ref={ref}
        onChange={handleSheetChange}
        handleComponent={null}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={true}
      >
        <BottomSheetView style={[styles.container, { paddingBottom: insetsBottom || 0 + 10 }]}>
          <View style={styles.headerBox}>
            <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.body1}>
              카테고리 {data ? '수정' : '추가'}
            </Text>
            <TouchableSVG SVG={CloseIcon} size={20} onPress={closeModal} />
          </View>
          <H h={8} />
          <View>
            <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption1} style={styles.caption}>
              팔레트
            </Text>
            <View style={styles.palette}>
              {categoryColorList.map((color) => (
                <Pressable key={color} onPress={() => setSelectedCategoryColor(color)} style={styles.colorChipBox}>
                  <View
                    style={[
                      styles.colorChip,
                      { backgroundColor: Color.category[color] },
                      selectedCategoryColor
                        ? selectedCategoryColor === color && { width: '100%' }
                        : color === data?.color && { width: '100%' },
                    ]}
                  />
                </Pressable>
              ))}
            </View>
          </View>
          <H h={8} />
          <View>
            <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption1} style={styles.caption}>
              카테고리 이름 {categoryName?.length || 0} / 10
            </Text>
            <H />
            <View>
              <BottomSheetTextInput
                ref={inputRef}
                style={[
                  styles.input,
                  data?.color && {
                    borderColor: Color.category[data?.color],
                    borderWidth: 1.5,
                  },
                  selectedCategoryColor && {
                    borderColor: Color.category[selectedCategoryColor],
                    borderWidth: 1.5,
                  },
                ]}
                onChangeText={setCategoryName}
                submitBehavior="submit"
                onSubmitEditing={onSubmit}
                autoComplete="off"
                autoCorrect={false}
                defaultValue={data?.title || ''}
              />
            </View>
            <View style={styles.bottomButtonBox}>
              <ConfirmButton
                title="삭제하기"
                color={Color.red}
                backgroundColor={Color.white}
                onPressButton={() => {}}
                width={'40%'}
              />
              <ConfirmButton
                title="수정완료"
                color={Color.black}
                backgroundColor={Color.yellow}
                onPressButton={() => {}}
                width={'40%'}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default CreateCategorySheet;

const styles = StyleSheet.create({
  backdrop: { backgroundColor: Color.black, position: 'absolute', width: '100%', height: '100%' },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  caption: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.gray2,
    height: 52,
    padding: 16,
    borderRadius: 8,
    color: Color.black,
    fontSize: 14,
  },
  palette: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: Color.gray2,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  colorChipBox: {
    width: '12%',
    aspectRatio: 1 / 1.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorChip: {
    width: '85%',
    aspectRatio: 1,
    marginVertical: 4,
    borderRadius: 30,
  },
  bottomButtonBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

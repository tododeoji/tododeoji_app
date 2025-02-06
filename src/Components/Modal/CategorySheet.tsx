import { StyleSheet, View } from 'react-native';
import React, { forwardRef } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { CloseIcon } from '../../assets/icons';
import { Text, TouchableSVG } from '../Common';
import { FontFamily, FontStyle } from '../../Common/Font';

interface CategorySheetProps {
  onCloseSheet: (index: number) => void;
}

const CategorySheet = forwardRef<BottomSheetModal, CategorySheetProps>(({ onCloseSheet }: CategorySheetProps, ref) => {
  return (
    <BottomSheetModal ref={ref} onChange={() => {}} handleComponent={null} enablePanDownToClose={true}>
      <BottomSheetView
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'gray',
          padding: 24,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          minHeight: 300,
        }}
      >
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.body1}>
            할 일 추가
          </Text>
          <TouchableSVG SVG={CloseIcon} size={20} onPress={onCloseSheet} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default CategorySheet;

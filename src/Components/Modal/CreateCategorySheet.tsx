import { StyleSheet, View } from 'react-native';
import React, { forwardRef, useCallback } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { CloseIcon } from '../../assets/icons';
import { H, Text, TouchableSVG } from '../Common';
import { FontFamily, FontStyle } from '../../Common/Font';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import Color from '../../Common/Color';

interface CreateCategorySheetProps {
  onCloseSheet: (index: number) => void;
}

const CreateCategorySheet = forwardRef<BottomSheetModal, CreateCategorySheetProps>(
  ({ onCloseSheet }: CreateCategorySheetProps, ref) => {
    const renderBackdrop = useCallback(
      (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          style={styles.backdrop}
          appearsOnIndex={0}
          opacity={0.4}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      [],
    );
    return (
      <BottomSheetModal
        ref={ref}
        onChange={() => {}}
        handleComponent={null}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.headerBox}>
            <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.body1}>
              카테고리 추가
            </Text>
            <TouchableSVG SVG={CloseIcon} size={20} onPress={onCloseSheet} />
          </View>
          <H h={8} />
          <View>
            <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption1} style={styles.caption}>
              카테고리 이름
            </Text>
          </View>
          <View>
            <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption1} style={styles.caption}>
              팔레트
            </Text>
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
    minHeight: 300,
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
});

import React, { useCallback, useLayoutEffect, useState, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DraggableFlatList, { DragEndParams, RenderItemParams } from 'react-native-draggable-flatlist';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

import { AddFloatingButton, H, NavigationHeader, Text, TouchableSVG } from '../../Components/Common';
import { ArrowBack, MoveIcon } from '../../assets/icons';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBottomSheetStore } from '../../stores/home';
import CreateCategorySheet from '../../Components/Modal/CreateCategorySheet';
import { useFocusEffect } from '@react-navigation/native';
import { CategoryItem, mockCategoryList } from '../../data/mockCategoryList';

interface HeaderItem {
  id: string;
  type: 'header';
  title: string;
  isEmpty?: boolean;
}

type ListItem = CategoryItem | HeaderItem;

interface CategoryScreenProps {
  navigation: any;
}

function CategoryScreen({ navigation }: CategoryScreenProps) {
  const { setRef, closeCategorySheet, openCategorySheet } = useBottomSheetStore();
  const categorySheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState<CategoryItem[]>(mockCategoryList);
  const isActiveShared = useSharedValue(false);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | undefined>();

  useFocusEffect(
    useCallback(() => {
      setRef(categorySheetRef);
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          insets={insets}
          HeaderTitle="카테고리 관리"
          LeftComponent={<TouchableSVG SVG={ArrowBack} onPress={() => navigation.goBack()} />}
        />
      ),
    });
  }, [insets, navigation]);

  const isHeaderItem = (item: ListItem): item is HeaderItem => 'type' in item && item.type === 'header';

  const onDragEnd = useCallback(({ data }: DragEndParams<ListItem>) => {
    const hiddenHeaderIndex = data.findIndex((item) => item.id === 'hidden_header');
    const newCategories = data
      .filter((item): item is CategoryItem => !('type' in item))
      .map((item) => ({
        ...item,
        isHidden: data.findIndex((dataItem) => dataItem.id === item.id) > hiddenHeaderIndex,
      }));
    setCategories(newCategories);
  }, []);

  const EmptySection = useCallback(
    ({ title }: { title: string }) => (
      <View style={styles.emptyContainer}>
        <Text color={Color.gray3}>{title}</Text>
      </View>
    ),
    [],
  );

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<ListItem>) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [
            {
              scale: withTiming(isActive ? 1.05 : 1, {
                duration: 100,
              }),
            },
          ],
        };
      }, [isActive]);

      if (isHeaderItem(item)) {
        if (item.id === 'visible_header') {
          return item.isEmpty ? <EmptySection title={`${item.title}가 없어요.`} /> : null;
        }
        return (
          <View style={[styles.headerContainer, item.id === 'hidden_header' && { marginTop: 40 }]}>
            <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption1}>
              {item.title}
            </Text>
            <H h={8} />
            {item.isEmpty && <EmptySection title={`${item.title}가 없어요.`} />}
          </View>
        );
      }
      return (
        <Animated.View style={[styles.itemContainer, animatedStyle]}>
          <Pressable
            onPressIn={drag}
            onPressOut={() => (isActiveShared.value = false)}
            onLongPress={() => (isActiveShared.value = true)}
          >
            <MoveIcon />
          </Pressable>
          <Pressable
            onPress={() => {
              console.log(item);
              setSelectedItem(item);
              openCategorySheet(categorySheetRef);
            }}
            style={{ flex: 1 }}
          >
            <View style={styles.categoryItem}>
              <Text>{item.title}</Text>
              <View style={[styles.colorDot, { backgroundColor: Color.category[item.color] }]} />
            </View>
          </Pressable>
        </Animated.View>
      );
    },
    [isActiveShared],
  );

  const listData = useMemo(() => {
    const visibleCategories = categories.filter((item) => !item.isHidden);
    const hiddenCategories = categories.filter((item) => item.isHidden);
    return [
      {
        id: 'visible_header',
        type: 'header' as const,
        title: '사용 중인 카테고리',
        isEmpty: visibleCategories.length === 0,
      },
      ...visibleCategories,
      { id: 'hidden_header', type: 'header' as const, title: '숨긴 카테고리', isEmpty: hiddenCategories.length === 0 },
      ...hiddenCategories,
    ];
  }, [categories]);

  const keyExtractor = useCallback((item: ListItem) => item.id, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption1}>
            사용 중인 카테고리
          </Text>
          <H h={8} />
        </View>
        <DraggableFlatList<ListItem>
          data={listData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onDragEnd={onDragEnd}
          ListFooterComponent={<H h={insets.bottom ? insets.bottom + 50 : 70} />}
        />
        <AddFloatingButton onPress={() => setSelectedItem(undefined)} insetsBottom={insets.bottom} />
      </View>
      <CreateCategorySheet
        data={selectedItem}
        ref={categorySheetRef}
        onCloseSheet={closeCategorySheet}
        insetsBottom={insets.bottom}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 24,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  colorDot: { width: 20, height: 20, borderRadius: 10 },
  headerContainer: { width: '100%', backgroundColor: '#FFFFFF', zIndex: 1, paddingHorizontal: 24 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', height: 46 },
});

export default CategoryScreen;

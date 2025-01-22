import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { H, NavigationHeader, Text, TouchableSVG } from '../../Components/Common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowBack } from '../../assets/icons';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CategoryItem {
  id: string;
  title: string;
  color: string;
  isHidden: boolean;
}

interface CategoryScreenProps {
  navigation: any;
}

function CategoryScreen({ navigation }: CategoryScreenProps) {
  const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: '1', title: '금융', color: '#FFD700', isHidden: false },
    { id: '2', title: '회사', color: '#90EE90', isHidden: false },
    { id: '3', title: '집', color: '#87CEEB', isHidden: false },
    { id: '4', title: '중요', color: '#FFB6C1', isHidden: false },
    { id: '5', title: '휴먼', color: '#D3D3D3', isHidden: true },
    { id: '6', title: '학교', color: '#98FB98', isHidden: true },
  ]);

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

  const renderItem = ({ item, drag, isActive }: RenderItemParams<CategoryItem>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.categoryItem, { backgroundColor: item.color + '20' }]}
        >
          <View style={[styles.colorDot, { backgroundColor: item.color }]} />
          <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const activeCategories = categories.filter((cat) => !cat.isHidden);
  const hiddenCategories = categories.filter((cat) => cat.isHidden);

  return (
    <View style={styles.Container}>
      <View>
        <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption1}>
          사용 중인 카테고리
        </Text>
        <H h={16} />
        {activeCategories.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text color={Color.gray3}>사용 중인 카테고리가 없어요.</Text>
          </View>
        ) : (
          <DraggableFlatList
            data={activeCategories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => setCategories(data)}
          />
        )}
      </View>

      <View style={{ marginTop: 40 }}>
        <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.caption1}>
          숨긴 카테고리
        </Text>
        <H h={16} />
        {hiddenCategories.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text color={Color.gray3}>숨긴 카테고리가 없어요.</Text>
          </View>
        ) : (
          <DraggableFlatList
            data={hiddenCategories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => setCategories(data)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 24,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryTitle: {
    flex: 1,
  },
  emptyContainer: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryScreen;

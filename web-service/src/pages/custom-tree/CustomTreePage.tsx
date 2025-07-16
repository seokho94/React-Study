import React from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

// 커스텀 트리 데이터 구조 (headless-tree 대신 직접 구현)
interface TreeNode {
  id: string;
  name: string;
  children?: string[];
}

interface TreeData {
  [key: string]: TreeNode;
}

const treeData: TreeData = {
  root: {
    id: 'root',
    name: 'ROOT',
    children: ['dbms', 'k8s', 'nms', 'sms', 'test3', 'test', 'test2', 'testgroup', 'wms'],
  },
  dbms: { id: 'dbms', name: 'DBMS' },
  k8s: { id: 'k8s', name: 'k8s' },
  nms: { id: 'nms', name: 'NMS' },
  sms: { id: 'sms', name: 'SMS' },
  test3: { id: 'test3', name: 'Test3' },
  test: { id: 'test', name: 'Test' },
  test2: { id: 'test2', name: 'TEST' },
  testgroup: { id: 'testgroup', name: 'TestGroup' },
  wms: { id: 'wms', name: 'WMS' },
};

// 트리 상태 관리 훅
const useTreeState = (initialData: TreeData) => {
  const [treeData] = React.useState<TreeData>(initialData);
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set(['root']));
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set(['root']));

  const getItemById = (id: string) => treeData[id];
  const isItemOpen = (id: string) => openItems.has(id);
  const isItemSelected = (id: string) => selectedItems.has(id);
  const getItemChildren = (id: string) => treeData[id]?.children || [];
  const getItemLevel = (id: string): number => {
    const getLevel = (itemId: string, level: number = 0): number => {
      if (itemId === 'root') return level;
      for (const [key, item] of Object.entries(treeData)) {
        if (item.children?.includes(itemId)) {
          return getLevel(key, level + 1);
        }
      }
      return level;
    };
    return getLevel(id);
  };

  const selectItem = (id: string) => {
    setSelectedItems(new Set([id]));
  };

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return {
    getItemById,
    isItemOpen,
    isItemSelected,
    getItemChildren,
    getItemLevel,
    selectItem,
    toggleItem,
  };
};

// 트리 아이템 컴포넌트
interface TreeItemProps {
  itemId: string;
  tree: ReturnType<typeof useTreeState>;
}

const TreeItem = ({ itemId, tree }: TreeItemProps) => {
  const item = tree.getItemById(itemId);
  const isOpen = tree.isItemOpen(itemId);
  const isSelected = tree.isItemSelected(itemId);
  const children = tree.getItemChildren(itemId);
  const level = tree.getItemLevel(itemId);

  if (!item) return null;

  return (
    <div style={{ paddingLeft: level * 20 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 8px',
          cursor: 'pointer',
          backgroundColor: isSelected ? '#e3f2fd' : 'transparent',
        }}
        onClick={() => tree.selectItem(itemId)}
      >
        {children && children.length > 0 && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              tree.toggleItem(itemId);
            }}
            style={{ marginRight: 8, fontSize: 12 }}
          >
            {isOpen ? '▼' : '▶'}
          </span>
        )}
        <span>{item.name}</span>
      </div>
      {isOpen && children && (
        <div>
          {children.map((childId: string) => (
            <TreeItem key={childId} itemId={childId} tree={tree} />
          ))}
        </div>
      )}
    </div>
  );
};

// 샘플 그리드 데이터 및 컬럼 정의
const columns: GridColDef[] = [
  { field: 'group', headerName: '그룹명', width: 180 },
  { field: 'device', headerName: '장비명', width: 180 },
  { field: 'ip', headerName: 'IP', width: 150 },
  { field: 'created', headerName: '생성시간', width: 180 },
  { field: 'updated', headerName: '수정시간', width: 180 },
];

const rows = [
  { id: 1, group: 'DBMS', device: '110.40 PostgreSQL', ip: '192.168.110.40', created: '2024-01-03 15:14', updated: '2024-08-19 15:29' },
  { id: 2, group: 'SMS', device: '110.43 DOFServer 1', ip: '192.168.110.43', created: '2024-01-09 08:17', updated: '2024-08-01 21:21' },
  // ... 추가 데이터
];

const CustomTreePage = () => {
  const tree = useTreeState(treeData);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {/* 상단 타이틀 및 검색/버튼 영역 */}
      <Typography variant="h5" sx={{ mb: 2 }}>Custom Tree + MUIX Data Grid</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* 검색 입력 */}
          <TextField label="그룹명/장비명/IP 검색" size="small" variant="outlined" />
          {/* 버튼들 */}
          <Button variant="contained">장비추가</Button>
          <Button variant="outlined">장비삭제</Button>
          <Button variant="outlined">관리그룹추가</Button>
        </Stack>
      </Paper>
      {/* 메인 컨텐츠: 좌측 트리, 우측 그리드 */}
      <Box sx={{ display: 'flex', height: 600 }}>
        {/* 좌측 트리 영역 */}
        <Paper sx={{ width: 250, mr: 2, p: 1, overflow: 'auto' }}>
          {/* Headless Tree 컴포넌트 */}
          <div>
            <TreeItem itemId="root" tree={tree} />
          </div>
        </Paper>
        {/* 우측 그리드 영역 */}
        <Box sx={{ flex: 1 }}>
          {/* MUIX Data Grid 컴포넌트 */}
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            pagination
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomTreePage; 
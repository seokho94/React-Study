import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import { useState, useMemo } from 'react';

// 트리 데이터 타입 정의
type TreeItem = {
  index: string;
  isFolder: boolean;
  children: string[];
  data: string;
};

type TreeData = {
  items: { [key: string]: TreeItem };
};

// 초기 트리 데이터
const initialTreeData: TreeData = {
  items: {
    root: {
      index: 'root',
      isFolder: true,
      children: ['main-root'],
      data: 'ROOT',
    },
    'main-root': {
      index: 'main-root',
      isFolder: true,
      children: ['system', 'network', 'database'],
      data: 'Root',
    },
    system: {
      index: 'system',
      isFolder: true,
      children: ['k8s', 'wms'],
      data: 'System',
    },
    network: {
      index: 'network',
      isFolder: true,
      children: ['nms', 'sms'],
      data: 'Network',
    },
    database: {
      index: 'database',
      isFolder: true,
      children: ['dbms'],
      data: 'Database',
    },
    k8s: {
      index: 'k8s',
      isFolder: false,
      children: [],
      data: 'Kubernetes',
    },
    wms: {
      index: 'wms',
      isFolder: false,
      children: [],
      data: 'WMS',
    },
    nms: {
      index: 'nms',
      isFolder: false,
      children: [],
      data: 'NMS',
    },
    sms: {
      index: 'sms',
      isFolder: false,
      children: [],
      data: 'SMS',
    },
    dbms: {
      index: 'dbms',
      isFolder: false,
      children: [],
      data: 'DBMS',
    },
  },
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
  { id: 3, group: 'NMS', device: '110.44 NMS Server', ip: '192.168.110.44', created: '2024-01-10 10:30', updated: '2024-08-15 14:22' },
  { id: 4, group: 'WMS', device: '110.45 WMS Server', ip: '192.168.110.45', created: '2024-01-12 09:15', updated: '2024-08-18 11:45' },
  { id: 5, group: 'k8s', device: '110.46 Kubernetes', ip: '192.168.110.46', created: '2024-01-15 16:20', updated: '2024-08-20 08:30' },
];

const ComplexTreePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색 필터링 로직 개선
  const filteredTreeData = useMemo(() => {
    if (!searchTerm.trim()) return initialTreeData;

    const searchLower = searchTerm.toLowerCase();
    const filtered: { [key: string]: TreeItem } = {};
    
    // 검색 조건에 맞는 노드들을 찾기
    const matchingNodes = new Set<string>();
    const parentNodes = new Set<string>();
    
    // 1단계: 검색어와 일치하는 노드들 찾기
    Object.entries(initialTreeData.items).forEach(([id, item]) => {
      if (item.data.toLowerCase().includes(searchLower)) {
        matchingNodes.add(id);
      }
    });
    
    // 2단계: 일치하는 노드들의 부모 노드들 찾기
    const findParents = (nodeId: string) => {
      Object.entries(initialTreeData.items).forEach(([id, item]) => {
        if (item.children.includes(nodeId)) {
          parentNodes.add(id);
          findParents(id); // 재귀적으로 상위 부모들도 찾기
        }
      });
    };
    
    matchingNodes.forEach(nodeId => {
      findParents(nodeId);
    });
    
    // 3단계: 필터링된 데이터 구성
    // root는 항상 포함
    if (initialTreeData.items.root) {
      filtered.root = initialTreeData.items.root;
    }
    
    // main-root도 항상 포함 (검색 결과가 있을 때)
    if (matchingNodes.size > 0 && initialTreeData.items['main-root']) {
      filtered['main-root'] = initialTreeData.items['main-root'];
    }
    
    // 부모 노드들 추가
    parentNodes.forEach(id => {
      if (id !== 'root' && id !== 'main-root') {
        filtered[id] = initialTreeData.items[id];
      }
    });
    
    // 검색 조건에 맞는 노드들 추가
    matchingNodes.forEach(id => {
      if (id !== 'root' && id !== 'main-root') {
        filtered[id] = initialTreeData.items[id];
      }
    });

    // 4단계: children 배열 업데이트 (검색 결과에 맞게)
    Object.keys(filtered).forEach(id => {
      const item = filtered[id];
      if (item.children.length > 0) {
        item.children = item.children.filter(childId => 
          filtered[childId] || matchingNodes.has(childId)
        );
      }
    });
    
    return { items: filtered };
  }, [searchTerm]);

  // DataProvider를 매번 새로 생성하여 트리 업데이트 보장
  const dataProvider = useMemo(() => {
    return new StaticTreeDataProvider(
      filteredTreeData.items, 
      (item, data) => ({ ...item, data })
    );
  }, [filteredTreeData]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {/* 상단 타이틀 및 검색/버튼 영역 */}
      <Typography variant="h5" sx={{ mb: 2 }}>React Complex Tree + MUIX Data Grid</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* 검색 입력 */}
          <TextField 
            label="트리 검색" 
            size="small" 
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="노드 이름을 입력하세요..."
            sx={{ minWidth: 200 }}
          />
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
          {/* React Complex Tree 컴포넌트 */}
          <UncontrolledTreeEnvironment
            dataProvider={dataProvider}
            getItemTitle={item => item.data}
            viewState={{}}
            canDragAndDrop={true}
            canDropOnFolder={true}
            canReorderItems={true}
          >
            <Tree treeId="tree-1" rootItem="root" treeLabel="그룹 트리" />
          </UncontrolledTreeEnvironment>
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

export default ComplexTreePage; 
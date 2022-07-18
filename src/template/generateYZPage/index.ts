export default 
`
import { usePageData } from '@yingzi/yhooks';
import DeleteConfirm from '@/components/DeleteConfirm';
import { Button, Divider } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { history, useLocation } from 'umi';
import TemplateList, { Props as TemplateListProps } from '@/components/TemplateList';
import service from './service';
import useRefreshTable from '@/utils/hooks/useRefreshTable';

const LeaseObject = (props) => {
  const {
    getDictionarySource,
  } = props;

  const LEASE_OBJECT_TYPE = getDictionarySource('YOUR_DICTONARYSOURCE'); // 数据字典

  const location = useLocation();
  const [page] = usePageData(service.getMainList);
  const { list, loading, initPage, refresh } = page;
  const [searchOption, setSearchOption] = useState<any>({}); // 搜索条件

  useEffect(() => {
    service.getCustomerList({ 'qp-type-eq': 20, 'qp-status-eq': 10 }).then((res) => {
      console.log('%c [ res ]-27', res)
    });
  }, [location]);

  useEffect(() => {
    initPage();
  }, []);

  useRefreshTable(() => {
    refresh();
  });
  // 搜索栏提交
  const onSubmit = (values) => {
    setSearchOption(values);
    initPage({ ...values });
  };

  // 操作
  const option = (
    optionType: 'add' | 'edit' | 'view',
    record?: any,
  ) => {
    switch (optionType) {
      case 'add': // 新增
        history.push({
          pathname: '',
        });
        break;
      case 'edit': // 编辑
        history.push({
          pathname: '',
        });
        break;
      case 'view':
        history.push({
          pathname: '',
        });
        break;
      default:
        break;
    }
  };

  // 表头配置
  const columns = [
    {
      title: '标号',
      dataIndex: 'code',
      ellipsis: true,
      render: (data) => data ?? '-',
    },
    {
      title: '名字',
      dataIndex: 'name',
      ellipsis: true,
      render: (data) => data ?? '-',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      ellipsis: true,
      render: (data) => data ?? '-',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      ellipsis: true,
      render: (data) => data ?? '-',
    },
    {
      title: '注册时间',
      dataIndex: 'time',
      render: (date: moment.MomentInput) =>
        date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data) => {
        switch (data) {
          case 1:
            return <span>毕业</span>;
          case 2:
            return <span>就读</span>;
          default:
            return '/';
        }
      },
    },
    {
      title: '操作',
      dataIndex: '_opt',
      fixed: 'right',
      width: 160,
      className: 'tableOperateCol',
      render: (_, record) => {
        return (
          <>
            <Button type="link" onClick={() => option('edit', record)}>修改</Button>
            <Divider type="vertical" />
          </>
          <DeleteConfirm
            isButton={false}
            key={record.id}
            confirmText={'确定要删除此申请吗？'}
            placement="topRight"
            onConfirm={() => {
              service.deleteSettlement({ id: record.id }).then((res) => {
                console.log('%c [ res ]-208', res);
                initPage({ ...searchOption });
              });
            }}
          />
        );
      },
    },
  ];

  const tableConfig = {
    rowKey: 'id',
    dataSource: list,
    columns,
    pagination: {
      current: page.pageNum,
      pageSize: page.pageSize,
      total: page.total,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100', '200'],
      onChange: page.jump,
    },
    loading,
  };

  // 表上方按钮配置
  const buttonList: any[] = [
    {
      type: 'primary',
      onClick: () => option('add'),
      text: '新增',
    },
  ];

  // 模板页面入参
  const templateListProps: TemplateListProps = {
    buttonList,
    tableConfig,
    searchFormProps: {
      config: [
        {
          name: 'qp-name-like',
          label: '姓名',
        },
        {
          name: 'qp-status-eq',
          type: 'select',
          label: '状态',
          list: LEASE_OBJECT_TYPE,
        },
        {
          name: 'qp-age-eq',
          type: 'input',
          label: '年龄',
        },
      ],
      onSearch: onSubmit,
    },
  };

  return (
    <>
      <TemplateList {...templateListProps} />
    </>
  );
};

export default LeaseObject;
`;
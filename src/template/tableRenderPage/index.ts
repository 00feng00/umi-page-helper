export default 
`
import OperateColumn from '@/components/OperateColumn';
import type { IBaseContentProps } from '@/typings';
import { PageContainer } from '@ant-design/pro-layout';
import {} from '@yingzi/yhooks';
import type { ActionType, ProColumns } from '@yingzi/yingzi-design';
import { DeleteConfirm, TableRender } from '@yingzi/yingzi-design';
import { Button } from 'antd';
import moment from 'moment';
import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import { history } from 'umi';
import api from './service';

const BiddingMgt = (props: PropsWithChildren<IBaseContentProps>) => {
  const { getDictionarySource } = props;
  const actionRef = useRef<ActionType>();

  const goDetail = (record) => {
    history.push({
      pathname: '/supplier-management/detail',
      query: {
        id: record?.id,
      },
    });
  };

  // 发布
  const publish = (record: any) => {};

  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      fixed: 'left',
    },
    {
      title: '类型',
      dataIndex: 'id',
      ellipsis: true,
      valueType: 'select',
      order: 6,
      searchFormColumn: {
        dataIndex: 'qp-name-like',
      },
      fieldProps: {
        option: [],
        placeholder: '请选择业务类型',
      },
    },
    {
      title: '状态',
      dataIndex: 'id',
      valueType: 'select',
      order: 5,
      searchFormColumn: {
        dataIndex: 'qp-name-like',
      },
      fieldProps: {
        option: [],
        placeholder: '请选择状态',
      },
    },
    {
      title: '商品',
      dataIndex: 'id',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '数量',
      dataIndex: 'mainName',
      hideInSearch: true,
      renderText(text, record) {
        //数量+单位
        return '123';
      },
    },
    {
      title: '价格',
      dataIndex: 'mainType',
      hideInSearch: true,
      renderText(text) {
        return '123元';
      },
    },
    {
      title: '开始时间',
      dataIndex: 'createUserName',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '结束时间',
      dataIndex: 'createUserName',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '日期',
      dataIndex: 'createUserName',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '地址',
      order: 3,
      ellipsis: true,
      dataIndex: 'createUserName',
      searchFormColumn: {
        dataIndex: 'qp-mainName-like',
      },
      fieldProps: {
        maxLength: 50,
        placeholder: '请输入地址',
      },
    },
    {
      title: '渠道',
      dataIndex: 'phoneNumber',
      valueType: 'select',
      order: 4,
      searchFormColumn: {
        dataIndex: 'qp-mainName-like',
      },
      fieldProps: {
        option: [],
        placeholder: '请选择发布渠道',
      },
    },
    {
      title: '备注',
      dataIndex: 'createUserName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '编码',
      dataIndex: 'createUserName',
      order: 7,
      searchFormColumn: {
        dataIndex: 'qp-mainName-like',
      },
      fieldProps: {
        maxLength: 50,
        placeholder: '请输入编码',
      },
    },
    {
      title: '名称',
      dataIndex: 'createUserName',
      hideInSearch: true,
    },
    {
      title: '其他时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      hideInSearch: true,
    },
    {
      title: '开始时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '其他时间',
      dataIndex: 'biddingTime',
      valueType: 'dateRange',
      hideInTable: true,
      order: 2,
      fieldProps: {
        placeholder: ['起始时间', '截至时间'],
      },
      search: {
        transform: (value) => {
          return {
            'qp-biddingTime-ge': moment(value[0]).format('YYYY-MM-DD 00:00:00'),
            'qp-biddingTime-lt': moment(value[1]).format('YYYY-MM-DD 23:59:59'),
          };
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      order: 1,
      fieldProps: {
        placeholder: ['创建起始时间', '创建截至时间'],
      },
      search: {
        transform: (value) => {
          return {
            'qp-createTime-ge': moment(value[0]).format('YYYY-MM-DD 00:00:00'),
            'qp-createTime-lt': moment(value[1]).format('YYYY-MM-DD 23:59:59'),
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      // className: 'operateCol',
      // width: 280,
      fixed: 'right',
      render: (dom, record) => {
        return (
          <OperateColumn
            list={[
              <Button onClick={() => goDetail(record)} type="link" key="1">
                详情
              </Button>,
              <Button onClick={() => goDetail(record)} type="link" key="2">
                编辑
              </Button>,
              <DeleteConfirm
                onConfirm={() => publish(publish)}
                confirmText="确定要发布吗？"
                key="3"
                linkText="发布"
              />,
              <Button onClick={() => goDetail(record)} type="link" key="4">
                删除
              </Button>,
              <Button onClick={() => goDetail(record)} type="link" key="5">
                取消
              </Button>,
              <Button onClick={() => goDetail(record)} type="link" key="6">
                撤回
              </Button>,
            ]}
          />
        );
      },
    },
  ];

  const getTableData = async (params) => {
    try {
      const result = await api.getMainList(params);
      const data = result?.data;
      console.log('result', result);

      return data;
    } catch (error) {
      return {};
    }
  };

  return (
    <PageContainer>
      <TableRender<any>
        pageContainerProps={{
          ghost: true,
        }}
        cardProps={{
          style: {
            marginBottom: '-16px',
          },
        }}
        toolbarTitle={<Button type="primary">新增</Button>}
        request={getTableData}
        columns={columns}
        actionRef={actionRef}
        search={{
          span: 6,
          defaultCollapsed: false,
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        rowSelection={false}
        dateFormatter="string"
        tableAlertRender={false}
        scroll={{ x: 'max-content' }}
      />
    </PageContainer>
  );
};
export default BiddingMgt;
`;
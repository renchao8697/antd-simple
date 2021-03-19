import type { FC } from 'react';
import { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AccountForm from './AccountForm';
import { queryAccount, updateAccount, deleteAccount, createAccout } from './services';
import type { AccountItem } from './data';

const submitHandler = async (values: AccountItem) => {
  const { _id } = values;
  const txt = _id ? '更新' : '创建';
  const hide = message.loading(`正在${txt}`);
  try {
    if (_id) {
      await updateAccount(values);
    } else {
      await createAccout(values);
    }
    hide();
    message.success(`${txt}成功`);
    return true;
  } catch (error) {
    hide();
    message.error(`${txt}失败`);
    return false;
  }
};
const deleteHandler = async (_id: string) => {
  const hide = message.loading('正在删除');
  try {
    await deleteAccount(_id);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败');
    return false;
  }
};

const AccountBook: FC<Record<string, never>> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formType, setFormType] = useState<'edit' | 'create'>('edit');
  const [row, setRow] = useState<AccountItem>();
  const actionRef = useRef<ActionType>();

  const createFun = () => {
    setShowModal(true);
    setFormType('create');
  };

  const editFun = (data: AccountItem) => {
    setRow(data);
    setShowModal(true);
    setFormType('edit');
  };
  const deleteFun = ({ _id }: AccountItem) => {
    Modal.confirm({
      title: '删除该项',
      content: '确定要删除该项账目吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        const success = await deleteHandler(_id);
        if (success) {
          actionRef.current?.reload();
        }
      },
    });
  };

  const columns: ProColumns<AccountItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      hideInSetting: true,
      width: 50,
    },
    {
      title: '使用日期',
      dataIndex: 'date',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
      width: 100,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '使用日期为必选项',
          },
        ],
      },
    },
    {
      title: '使用日期',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      hideInTable: true,
      hideInSetting: true,
      hideInForm: true,
      search: {
        transform: (values: string[]) => ({
          startDate: values[0],
          endDate: values[1],
        }),
      },
    },
    {
      title: '金额',
      dataIndex: 'amount',
      valueType: 'money',
      sorter: true,
      hideInSearch: true,
      width: 100,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '金额为必填项',
          },
        ],
      },
    },
    {
      title: '类型',
      dataIndex: 'status',
      valueType: 'select',
      filters: true,
      onFilter: true,
      width: 80,
      valueEnum: {
        1: '衣',
        2: '食',
        3: '住',
        4: '行',
        5: '其他',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '类型为必选项',
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      ellipsis: true,
      width: 100,
    },
    {
      title: '添加时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 180,
    },
    {
      title: '添加日期',
      dataIndex: 'createdAtRange',
      valueType: 'dateRange',
      hideInSetting: true,
      hideInTable: true,
      hideInForm: true,
      search: {
        transform: (values: string[]) => ({
          createStart: values[0],
          createEnd: values[1],
        }),
      },
    },
    {
      title: '操作',
      dataIndex: 'options',
      valueType: 'option',
      width: 100,
      render: (_, record) => (
        <>
          <a key="edit" onClick={() => editFun(record)}>
            编辑
          </a>
          <Divider type="vertical" />
          <a key="delete" onClick={() => deleteFun(record)}>
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<AccountItem>
        actionRef={actionRef}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        rowKey="_id"
        request={(params, sorter) => queryAccount({ ...params, sorter })}
        toolBarRender={() => [
          <Button type="primary" onClick={() => createFun()}>
            <PlusOutlined />
            新建
          </Button>,
        ]}
      ></ProTable>
      <AccountForm
        modalVisible={showModal}
        type={formType}
        onCancel={() => {
          setShowModal(false);
          setRow(undefined);
        }}
      >
        <ProTable<AccountItem, AccountItem>
          type="form"
          columns={columns}
          form={{
            initialValues: row,
            layout: 'horizontal',
            labelCol: {
              span: 6,
            },
            wrapperCol: {
              span: 12,
            },
          }}
          onSubmit={async (values) => {
            const success = await submitHandler({ ...row, ...values });
            if (success) {
              setRow(undefined);
              setShowModal(false);
              actionRef.current?.reload();
            }
          }}
        />
      </AccountForm>
    </PageContainer>
  );
};

export default AccountBook;

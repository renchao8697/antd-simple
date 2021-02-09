import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import style from './index.less'

const AvatarDropdown: React.FC = () => {
  return (
    <span className={`${style.action} ${style.account}`}>
      <Avatar size="small" className={style.avatar} icon={<UserOutlined />} />
      <span>Ren Chao</span>
    </span>
  )
}

export default AvatarDropdown
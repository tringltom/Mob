import React, { MouseEventHandler } from 'react'
import { View } from 'react-native'

import { faEyeSlash, faEye, faEnvelope, faLock, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTailwind } from 'tailwind-rn/dist';

const ICON_MAPS: Record<string, IconDefinition> = {
  'eyeSlash': faEyeSlash,
  'eye': faEye,
  'envelope': faEnvelope,
  'password': faLock,
  'facebook': faFacebook,
  'instagram': faInstagram,
  'user': faUser
}

interface IconProps extends React.SVGProps<SVGSVGElement> {    
    iconName: string;
}

const Icon = (props: IconProps) => {

  const tailwind = useTailwind();
  const {iconName} = props;  

  return (
    <View>
        <FontAwesomeIcon icon={ICON_MAPS[iconName]} />
    </View>
  )
}

export default Icon;
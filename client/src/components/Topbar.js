import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AccountIcon from "../res/icons/user.png";

function Topbar(props) {

    return(
        <div id="topbar">
            <Link to="/">
                <svg id="logo-full" width="209" height="53" viewBox="0 0 209 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M175 21.375C190.5 21.375 191.5 32.375 208.5 32.375M175 27.75C190.5 27.75 191.5 38.75 208.5 38.75M175 34.125C190.5 34.125 191.5 45.125 208.5 45.125M175 40.5C190.5 40.5 191.5 51.5 208.5 51.5M175 15C190.5 15 191.5 26 208.5 26" stroke="#00A3FF" strokeWidth="3"/>
                    <path d="M13.156 23.228L12.868 26H0.987999L1.24 19.052L0.987999 2.888H4.804L4.588 18.728L4.66 22.904H12.904L13.156 23.228ZM27.6319 17.864L17.5159 17.9C17.5399 19.724 17.9839 21.116 18.8479 22.076C19.7119 23.012 20.9359 23.48 22.5199 23.48C24.1759 23.48 25.7959 22.988 27.3799 22.004L27.7399 22.22L27.1999 25.172C25.4479 25.94 23.7439 26.324 22.0879 26.324C19.6159 26.324 17.6719 25.568 16.2559 24.056C14.8639 22.52 14.1679 20.432 14.1679 17.792C14.1679 15.128 14.8639 13.016 16.2559 11.456C17.6479 9.896 19.5319 9.116 21.9079 9.116C23.9239 9.116 25.4719 9.668 26.5519 10.772C27.6559 11.876 28.2079 13.436 28.2079 15.452C28.2079 16.004 28.1479 16.664 28.0279 17.432L27.6319 17.864ZM24.8959 15.02C24.8959 13.892 24.6319 13.04 24.1039 12.464C23.5999 11.888 22.8559 11.6 21.8719 11.6C20.7679 11.6 19.8559 11.96 19.1359 12.68C18.4159 13.376 17.9359 14.372 17.6959 15.668L24.8239 15.524L24.8959 15.02ZM38.1023 9.08C39.7583 9.08 41.0663 9.476 42.0263 10.268C42.9863 11.06 43.4663 12.164 43.4663 13.58C43.4663 14.012 43.3943 15.452 43.2503 17.9C43.1063 20.3 43.0343 21.704 43.0343 22.112C43.0343 22.568 43.1063 22.892 43.2503 23.084C43.4183 23.252 43.6943 23.336 44.0783 23.336C44.3183 23.336 44.6783 23.288 45.1583 23.192L45.4823 23.444L45.1223 25.46C44.4263 25.892 43.6703 26.156 42.8543 26.252C42.1103 26.18 41.5103 25.916 41.0543 25.46C40.5983 24.98 40.3223 24.356 40.2263 23.588H39.9743C38.7503 24.884 37.5023 25.784 36.2303 26.288C34.5743 26.264 33.2663 25.832 32.3063 24.992C31.3703 24.152 30.9023 23.012 30.9023 21.572C30.9023 19.436 32.0663 18.104 34.3943 17.576L40.0823 16.316L40.1183 14.372C40.1183 13.484 39.8903 12.812 39.4343 12.356C39.0023 11.9 38.3663 11.672 37.5263 11.672C36.7103 11.672 35.8943 11.864 35.0783 12.248C34.2623 12.608 33.3623 13.184 32.3783 13.976L32.0903 13.796L31.6223 11.24C33.7343 9.8 35.8943 9.08 38.1023 9.08ZM35.4023 19.556C34.9703 19.652 34.6583 19.82 34.4663 20.06C34.2743 20.276 34.1783 20.624 34.1783 21.104C34.1783 21.824 34.3703 22.388 34.7543 22.796C35.1623 23.204 35.7023 23.408 36.3743 23.408C37.5023 23.408 38.7023 22.676 39.9743 21.212L40.0823 18.44L35.4023 19.556ZM57.0712 9.368C57.3352 9.368 57.6352 9.392 57.9712 9.44V12.932L57.5752 13.04C57.1912 12.92 56.7472 12.86 56.2432 12.86C55.4992 12.86 54.8032 13.136 54.1552 13.688C53.5072 14.24 52.8832 15.128 52.2832 16.352L52.2472 18.728L52.4632 26H48.7912L49.0432 19.052L48.8272 9.656L52.3192 9.332L52.2832 12.644H52.5352C53.1832 11.492 53.9032 10.664 54.6952 10.16C55.4872 9.632 56.2792 9.368 57.0712 9.368ZM71.1827 15.092C71.2067 14.18 70.9907 13.472 70.5347 12.968C70.1027 12.44 69.4667 12.176 68.6267 12.176C67.2347 12.176 65.7947 12.896 64.3067 14.336L64.2707 18.728L64.4867 26H60.8147L61.0307 19.052L60.8507 9.656L64.3427 9.332L64.3067 11.744H64.5587C65.9747 10.496 67.4507 9.644 68.9867 9.188C70.8347 9.188 72.2267 9.608 73.1627 10.448C74.1227 11.288 74.5907 12.488 74.5667 14.048L74.4587 18.728L74.6387 26H70.9307L71.1827 15.092ZM87.3776 2.852C89.7056 2.852 91.4936 3.452 92.7416 4.652C94.0136 5.828 94.6496 7.532 94.6496 9.764C94.6496 12.356 93.8456 14.408 92.2376 15.92C90.6536 17.432 88.4696 18.188 85.6856 18.188H83.1296V18.728L83.3096 26H79.5296L79.7816 19.052L79.5296 2.888L87.3776 2.852ZM86.7656 15.308C88.0856 15.044 89.0816 14.48 89.7536 13.616C90.4496 12.728 90.7976 11.552 90.7976 10.088C90.7976 8.648 90.4256 7.58 89.6816 6.884C88.9616 6.188 87.8576 5.816 86.3696 5.768L83.3096 5.876L83.1656 15.236L86.7656 15.308ZM113.133 23.444L112.809 25.46C112.017 25.916 111.237 26.18 110.469 26.252C109.749 26.132 109.173 25.88 108.741 25.496C108.333 25.088 108.021 24.488 107.805 23.696H107.553C106.137 24.968 104.697 25.808 103.233 26.216C101.433 26.216 100.053 25.796 99.0933 24.956C98.1333 24.116 97.6653 22.916 97.6893 21.356L97.7613 16.856L97.6173 9.656L101.253 9.332L101.073 20.348C101.049 21.236 101.241 21.932 101.649 22.436C102.081 22.94 102.717 23.192 103.557 23.192C104.829 23.192 106.137 22.592 107.481 21.392V9.656L110.973 9.332L110.721 22.148C110.721 22.58 110.793 22.892 110.937 23.084C111.081 23.252 111.333 23.336 111.693 23.336C111.981 23.336 112.353 23.288 112.809 23.192L113.133 23.444ZM126.483 15.092C126.507 14.18 126.291 13.472 125.835 12.968C125.403 12.44 124.767 12.176 123.927 12.176C122.535 12.176 121.095 12.896 119.607 14.336L119.571 18.728L119.787 26H116.115L116.331 19.052L116.151 9.656L119.643 9.332L119.607 11.744H119.859C121.275 10.496 122.751 9.644 124.287 9.188C126.135 9.188 127.527 9.608 128.463 10.448C129.423 11.288 129.891 12.488 129.867 14.048L129.759 18.728L129.939 26H126.231L126.483 15.092ZM139.461 9.404L139.173 18.728L139.389 25.208C139.389 27.08 138.969 28.604 138.129 29.78C137.313 30.98 135.933 32.048 133.989 32.984L132.657 31.364V30.968C133.857 30.272 134.697 29.504 135.177 28.664C135.681 27.848 135.933 26.744 135.933 25.352L135.969 19.052L135.825 11.816H132.657L132.405 11.564L132.621 9.476H135.897L139.317 9.332L139.461 9.404ZM137.121 1.664C137.721 1.664 138.189 1.844 138.525 2.204C138.861 2.54 139.029 3.02 139.029 3.644C139.029 4.292 138.849 4.808 138.489 5.192C138.129 5.576 137.637 5.768 137.013 5.768C136.389 5.768 135.897 5.588 135.537 5.228C135.201 4.868 135.033 4.376 135.033 3.752C135.033 3.128 135.213 2.624 135.573 2.24C135.957 1.856 136.473 1.664 137.121 1.664ZM150.743 9.08C152.399 9.08 153.707 9.476 154.667 10.268C155.627 11.06 156.107 12.164 156.107 13.58C156.107 14.012 156.035 15.452 155.891 17.9C155.747 20.3 155.675 21.704 155.675 22.112C155.675 22.568 155.747 22.892 155.891 23.084C156.059 23.252 156.335 23.336 156.719 23.336C156.959 23.336 157.319 23.288 157.799 23.192L158.123 23.444L157.763 25.46C157.067 25.892 156.311 26.156 155.495 26.252C154.751 26.18 154.151 25.916 153.695 25.46C153.239 24.98 152.963 24.356 152.867 23.588H152.615C151.391 24.884 150.143 25.784 148.871 26.288C147.215 26.264 145.907 25.832 144.947 24.992C144.011 24.152 143.543 23.012 143.543 21.572C143.543 19.436 144.707 18.104 147.035 17.576L152.723 16.316L152.759 14.372C152.759 13.484 152.531 12.812 152.075 12.356C151.643 11.9 151.007 11.672 150.167 11.672C149.351 11.672 148.535 11.864 147.719 12.248C146.903 12.608 146.003 13.184 145.019 13.976L144.731 13.796L144.263 11.24C146.375 9.8 148.535 9.08 150.743 9.08ZM148.043 19.556C147.611 19.652 147.299 19.82 147.107 20.06C146.915 20.276 146.819 20.624 146.819 21.104C146.819 21.824 147.011 22.388 147.395 22.796C147.803 23.204 148.343 23.408 149.015 23.408C150.143 23.408 151.343 22.676 152.615 21.212L152.723 18.44L148.043 19.556ZM169.957 9.224C172.045 9.224 173.641 9.92 174.745 11.312C175.849 12.704 176.401 14.66 176.401 17.18C176.401 20.108 175.693 22.364 174.277 23.948C172.861 25.532 170.893 26.324 168.373 26.324C167.149 26.324 165.925 26.048 164.701 25.496L162.397 26.432L161.857 26.072L162.109 19.088L161.893 1.016L165.565 0.727997L165.421 11.708H165.637C166.381 11.06 167.077 10.556 167.725 10.196C168.373 9.812 169.117 9.488 169.957 9.224ZM168.517 23.804C169.909 23.804 171.001 23.312 171.793 22.328C172.585 21.32 172.981 19.808 172.981 17.792C172.981 15.992 172.669 14.612 172.045 13.652C171.421 12.668 170.521 12.176 169.345 12.176C168.073 12.176 166.753 12.896 165.385 14.336L165.313 18.656L165.421 22.832C166.501 23.48 167.533 23.804 168.517 23.804ZM180.562 19.052L180.454 9.656L184.054 9.332L183.91 18.728L184.018 26H180.418L180.562 19.052ZM182.29 1.664C182.89 1.664 183.358 1.844 183.694 2.204C184.03 2.54 184.198 3.02 184.198 3.644C184.198 4.292 184.018 4.808 183.658 5.192C183.298 5.576 182.806 5.768 182.182 5.768C181.558 5.768 181.066 5.588 180.706 5.228C180.37 4.868 180.202 4.376 180.202 3.752C180.202 3.128 180.382 2.624 180.742 2.24C181.126 1.856 181.642 1.664 182.29 1.664Z" fill="black"/>
                </svg>
            </Link>
            { props.auth.isAuthenticated ? (
                <div>Hello {props.auth.user.username}!</div>
            ) : null }
            <Link to="/account">
                <div className="account-button">
                    <img src={AccountIcon} alt="account-open-button-icon"></img>
                </div>
            </Link>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {
    }
)(Topbar);
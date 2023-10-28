export interface ErrorBody extends Error {
    code: string;
}

export const errorMessages = {
    auth: {
        wrongCredentials: {
            message: 'Tên tài khoản hoặc mật khẩu không đúng',
            code: '60001',
        },
        userNameAlreadyExist: {
            message: 'Tài khoản này đã tồn tại',
            code: '60002',
        },
        emailAlreadyExist: {
            message: 'Email này đã được sử dụng',
            code: '60003',
        },
        expiredToken: {
            message: 'token expired',
            code: '60004',
        },
        invlidToken: {
            message: 'invlid token',
            code: '60005',
        },
        notAllowed: {
            message: 'not allowed',
            code: '60006',
        },
    },
    jobPosting: {
        jobPostingAlreadyExist: {
            message: 'Bài tuyển dụng này đã tồn tại',
            code: '60201',
        },
        jobPostingNotFound: {
            message: 'Không tìm thấy bài tuyển dụng',
            code: '60202',
        },
    },
    company: {
        companyNameAlreadyExist: {
            message: 'Tên công ty này đã tồn tại',
            code: '70201-Name',
        },
        companyEmailAlreadyExist: {
            message: 'Email của công ty này đã tồn tại',
            code: '70201-Email',
        },
        companyPhoneNumberAlreadyExist: {
            message: 'Số điện thoại ty này đã tồn tại',
            code: '70201-Phone',
        },
        companyNotFound: {
            message: 'Không tìm thấy công ty',
            code: '70202',
        },
    },
    role: {
        notFound: {
            message: 'role not found',
            code: '60201',
        },
    },
    category: {
        notFound: {
            message: 'category not found',
            code: '60301',
        },
    },
    product: {
        notFound: {
            message: 'product not found',
            code: '60401',
        },
        notFulfilled: {
            message: 'not all product info is fulfilled',
            code: '60402',
        },
    },
    user: {
        notFound: {
            message: 'Không tìm thấy người dùng',
            code: '60101',
        },
        global: {
            internalError: {
                message: 'something went wrong',
                code: '70000',
            },
        },
    },
    global: {
        internalError: {
            message: 'something went wrong',
            code: '70000',
        },
    },
};

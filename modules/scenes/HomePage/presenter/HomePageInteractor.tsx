import {
    AbstractPhoneNumberPresenter,
    AbstractPhoneNumberPresenterOutput
} from "../../../domain/UseCases/CusineListUseCase";


interface AbstractHomePageInteractor extends AbstractPhoneNumberPresenterOutput {
    phoneNumberPresenter?: AbstractPhoneNumberPresenter
}


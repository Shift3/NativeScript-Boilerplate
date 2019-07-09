import { ReleaseService } from "../app/services/release.service";

describe('Release notes: ', function () {
	var releaseService: ReleaseService = new ReleaseService();
	var data: string;
	var dataUpperCase: string;
	var isReleaseFileExist: boolean;

	it("Release notes is exist.", function () {
		isReleaseFileExist = releaseService.checkReleaseFileExist();
		expect(isReleaseFileExist).equal(true);
	});

	it("Read most recent release notes.", function () {
		if (!!isReleaseFileExist) {
			data = releaseService.readReleaseFile();
			dataUpperCase = data.toUpperCase();
			expect(data).not.equal(null);
			expect(data).not.equal(undefined);
			expect(data).not.equal("");
		}
	});

	it("Notes lines either end or not end with dot.", function () {
		if (!!data) {
			var isLinesEndConsistent = releaseService.isLinesEndConsistent(data);
			expect(isLinesEndConsistent).equal(true);
		}
	});

	it("Notes lines start with upper case.", function () {
		if (!!data) {
			var isNotesStartWithUpperCase = releaseService.isNotesStartWithUpperCase(data);
			expect(isNotesStartWithUpperCase).equal(true);
		}
	});

	it("Notes lines not start with space.", function () {
		if (!!data) {
			var isNotesStartWithSpace = releaseService.isNotesStartWithSpace(data);
			expect(isNotesStartWithSpace).equal(false);
		}
	});

	it("Notes lines has not long space.", function () {
		if (!!data) {
			var isNotesHasLongSpace = releaseService.isNotesHasLongSpace(data);
			expect(isNotesHasLongSpace).equal(false);
		}
	});

	describe('(Android Platform)', function () {
		it("Less than 500 characters.", function () {
			if (!!data) {
				expect(data.length).lessThan(501);
			}
		});

		it("Not Include IOS keyword.", function () {
			if (!!data) {
				expect(dataUpperCase).not.contain("IOS");
				expect(dataUpperCase).not.contain("APPLE");
			}
		});
	});

	describe('(IOS Platform)', function () {
		it("Not Include android keyword.", function () {
			if (!!data) {
				expect(dataUpperCase).not.contain("ANDROID");
				expect(dataUpperCase).not.contain("GOOGLE");
			}
		});
	});
});